import pytest
from app.services.github_service import GithubService

@pytest.fixture
def github_service():
	return GithubService(token="fake-token")


def test_github_service_get_github_url(github_service: GithubService):
	assert github_service.get_github_url("Brian-J-Wang/test-repo") == (
		"https://api.github.com/repos/Brian-J-Wang/test-repo/contents/portfolio.md"
	)

def test_github_service_get_github_url_from_github_link(github_service: GithubService):
	assert github_service.get_github_url_from_github_link("https://github.com/Brian-J-Wang/test-repo") == (
		"Brian-J-Wang/test-repo"
	)
