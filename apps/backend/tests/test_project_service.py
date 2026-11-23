from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch
import pytest
from pymongo import AsyncMongoClient
from app.repository.model.project import Project
from app.schemas.github_events import PushEvent, Repository
from app.schemas.github_project import GithubProject, ProjectContent, ProjectLinks, ProjectMetadata
from app.services.project_service import ProjectService


@pytest.fixture
def project_service_deps():
	github_service = MagicMock()
	project_repository = MagicMock()
	project_repository.upsert_project = AsyncMock()
	project_repository.get_malformed_projects = AsyncMock(return_value=[])
	service = ProjectService(github_service=github_service, project_repository=project_repository)
	return service, github_service, project_repository


def _make_mock_github_project() -> GithubProject:
	return GithubProject(
		metadata=ProjectMetadata(
			name="Synced Project",
			project_type="personal",
			description="Freshly synced from GitHub",
			tech_stack=["Python"],
			links=[ProjectLinks(link_type="github", href="https://github.com/Brian-J-Wang/demo")],
			featured=False,
		),
		content=ProjectContent(content="# Body"),
	)


def _make_sample_repo(node_id: str = "R_kgDOUnit123") -> Repository:
	now = datetime.now(timezone.utc)
	return Repository(
		created_at=now,
		updated_at=now,
		node_id=node_id,
		name="test-portfolio-repo",
		full_name="Brian-J-Wang/test-portfolio-repo",
		html_url="https://github.com/Brian-J-Wang/test-portfolio-repo",
		description="Test repository",
		owner={"login": "Brian-J-Wang"},
	)


@pytest.mark.anyio
async def test_sync_project_ignores_non_main_branch(project_service_deps):
	service, github_service, project_repository = project_service_deps

	event = PushEvent(
		repository=_make_sample_repo(),
		ref="refs/heads/feature-branch",
		commits=[],
	)

	await service.sync_project_from_webhook(event)

	github_service.get_github_project.assert_not_called()
	project_repository.upsert_project.assert_not_called()


@pytest.mark.anyio
async def test_sync_project_appends_github_link_when_missing(project_service_deps):
	service, github_service, project_repository = project_service_deps
	mock_github_project = GithubProject(
		metadata=ProjectMetadata(
			name="Unit Test Project",
			project_type="personal",
			description="Project without a github link",
			tech_stack=["Python"],
			links=[ProjectLinks(link_type="live", href="https://example.com")],
			featured=False,
		),
		content=ProjectContent(content="# Body"),
	)
	github_service.get_github_project.return_value = mock_github_project

	event = PushEvent(
		repository=_make_sample_repo(node_id="R_kgDOUnitLink"),
		ref="refs/heads/main",
		commits=[],
	)

	with patch("app.services.project_service.Project", side_effect=lambda **kwargs: SimpleNamespace(**kwargs)):
		await service.sync_project_from_webhook(event)

	project_repository.upsert_project.assert_awaited_once()
	repo_id, saved_project = project_repository.upsert_project.call_args.args
	assert repo_id == "R_kgDOUnitLink"
	assert any(
		link.link_type == "github" and link.href == "https://github.com/Brian-J-Wang/test-portfolio-repo"
		for link in saved_project.project_metadata.links
	)


@pytest.mark.anyio
async def test_sync_project_does_not_duplicate_github_link(project_service_deps):
	service, github_service, project_repository = project_service_deps
	existing_github_url = "https://github.com/Brian-J-Wang/custom-link"
	mock_github_project = GithubProject(
		metadata=ProjectMetadata(
			name="Unit Test Project",
			project_type="work",
			description="Project that already has a github link",
			tech_stack=["Python"],
			links=[ProjectLinks(link_type="github", href=existing_github_url)],
			featured=True,
		),
		content=ProjectContent(content="# Body"),
	)
	github_service.get_github_project.return_value = mock_github_project

	event = PushEvent(
		repository=_make_sample_repo(),
		ref="refs/heads/main",
		commits=[],
	)

	with patch("app.services.project_service.Project", side_effect=lambda **kwargs: SimpleNamespace(**kwargs)):
		await service.sync_project_from_webhook(event)

	_, saved_project = project_repository.upsert_project.call_args.args
	github_links = [link for link in saved_project.project_metadata.links if link.link_type == "github"]
	assert len(github_links) == 1
	assert github_links[0].href == existing_github_url

@pytest.mark.anyio
async def test_sync_malformed_projects(db_client: AsyncMongoClient):
	collection = Project.get_pymongo_collection()
	await collection.insert_one({
		"node_id": "R_malformed_1",
		"project_metadata": {
			"links": [{"link_type": "github", "href": "https://github.com/Brian-J-Wang/demo"}]
		},
	})


@pytest.mark.anyio
async def test_sync_malformed_projects_skips_when_none_malformed(project_service_deps):
	service, github_service, project_repository = project_service_deps

	await service.sync_malformed_projects()

	github_service.get_github_project_from_url.assert_not_called()
	project_repository.upsert_project.assert_not_called()


@pytest.mark.anyio
async def test_sync_malformed_projects_resyncs_malformed_doc(project_service_deps):
	service, github_service, project_repository = project_service_deps
	malformed_doc = {
		"node_id": "R_malformed_1",
		"project_metadata": {
			"links": [{"link_type": "github", "href": "https://github.com/Brian-J-Wang/demo"}]
		},
	}
	github_service.get_github_project_from_url.return_value = _make_mock_github_project()
	project_repository.get_malformed_projects.return_value = [malformed_doc]

	with patch("app.services.project_service.Project", side_effect=lambda **kwargs: SimpleNamespace(**kwargs)):
		await service.sync_malformed_projects()

	github_service.get_github_project_from_url.assert_called_once_with("https://github.com/Brian-J-Wang/demo")
	project_repository.upsert_project.assert_awaited_once()
	repo_id, saved_project = project_repository.upsert_project.call_args.args
	assert repo_id == "R_malformed_1"
	assert saved_project.node_id == "R_malformed_1"


@pytest.mark.anyio
@pytest.mark.parametrize(
	"malformed_doc",
	[
		{"project_metadata": {"links": [{"link_type": "github", "href": "https://github.com/Brian-J-Wang/demo"}]}},
		{"node_id": "R_no_metadata"},
		{"node_id": "R_no_github_link", "project_metadata": {"links": [{"link_type": "live", "href": "https://example.com"}]}},
	],
)
async def test_sync_malformed_projects_skips_unrecoverable_docs(project_service_deps, malformed_doc):
	service, github_service, project_repository = project_service_deps
	project_repository.get_malformed_projects.return_value = [malformed_doc]

	await service.sync_malformed_projects()

	github_service.get_github_project_from_url.assert_not_called()
	project_repository.upsert_project.assert_not_called()
