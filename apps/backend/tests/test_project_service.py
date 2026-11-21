from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch
import pytest
from app.schemas.github_events import PushEvent, Repository
from app.schemas.github_project import GithubProject, ProjectContent, ProjectLinks, ProjectMetadata
from app.services.project_service import ProjectService


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
async def test_sync_project_ignores_non_main_branch():
	github_service = MagicMock()
	project_repository = MagicMock()
	project_repository.upsert_project = AsyncMock()
	service = ProjectService(github_service=github_service, project_repository=project_repository)

	event = PushEvent(
		repository=_make_sample_repo(),
		ref="refs/heads/feature-branch",
		commits=[],
	)

	await service.sync_project_from_webhook(event)

	github_service.get_github_project.assert_not_called()
	project_repository.upsert_project.assert_not_called()


@pytest.mark.anyio
async def test_sync_project_appends_github_link_when_missing():
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

	github_service = MagicMock()
	github_service.get_github_project.return_value = mock_github_project
	project_repository = MagicMock()
	project_repository.upsert_project = AsyncMock()
	service = ProjectService(github_service=github_service, project_repository=project_repository)

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
async def test_sync_project_does_not_duplicate_github_link():
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

	github_service = MagicMock()
	github_service.get_github_project.return_value = mock_github_project
	project_repository = MagicMock()
	project_repository.upsert_project = AsyncMock()
	service = ProjectService(github_service=github_service, project_repository=project_repository)

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
