from datetime import datetime, timezone
from unittest.mock import patch
import pytest
from config import Settings
from app.repository.model.project import Project
from app.schemas.github_events import GithubWebhookEvent, Repository
from app.schemas.github_project import GithubProject, ProjectContent, ProjectLinks, ProjectMetadata
from app.services.github_service import get_github_service
from app.services.project_service import get_project_service
from app.repository.project_repository import get_project_repository

@pytest.mark.anyio
async def test_save_github_webhook_event_to_db(db_client, get_settings: Settings):
	test_node_id = "R_kgDOTestNode123"
	now = datetime.now(timezone.utc)

	# 2. Construct a sample GithubWebhookEvent payload
	event = GithubWebhookEvent(
		repository=Repository(
			created_at=now,
			updated_at=now,
			node_id=test_node_id,
			name="test-portfolio-repo",
			full_name="Brian-J-Wang/test-portfolio-repo",
			html_url="https://github.com/Brian-J-Wang/test-portfolio-repo",
			description="Test repository",
			owner={"login": "Brian-J-Wang"},
		)
	)

	mock_github_project = GithubProject(
		metadata=ProjectMetadata(
			name="Test Project",
			project_type="personal",
			description="A test project saved from a webhook event",
			tech_stack=["Python", "FastAPI", "MongoDB"],
			links=[ProjectLinks(link_type="live", href="https://example.com")],
			featured=True,
		),
		content=ProjectContent(content="# Hello World\nProject body content."),
	)

	try:
		# 3. Mock GithubProject.from_github so we test DB persistence without hitting GitHub's network API
		with patch.object(GithubProject, "from_github", return_value=mock_github_project):
			github_service = get_github_service(settings=get_settings)
			project_service = get_project_service(
				github_service=github_service,
				project_repository=get_project_repository(),
			)
			await project_service.sync_project_from_webhook(event)

		# 4. Query MongoDB to verify the document was saved
		saved_project = await Project.find_one(Project.node_id == test_node_id)
		assert saved_project is not None
		assert saved_project.node_id == test_node_id
		assert saved_project.project_metadata.name == "Test Project"
		assert any(
			link.link_type == "github" and link.href == "https://github.com/Brian-J-Wang/test-portfolio-repo"
			for link in saved_project.project_metadata.links
		)
	finally:
		# 5. Clean up test document
		await Project.find_one(Project.node_id == test_node_id).delete()
