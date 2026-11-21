from app.services.github_service import GithubService


def test_github_service_get_github_url():
	service = GithubService(token="fake-token")
	assert service.get_github_url("Brian-J-Wang/test-repo") == (
		"https://api.github.com/repos/Brian-J-Wang/test-repo/contents/portfolio.md"
	)
