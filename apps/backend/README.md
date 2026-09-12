# Github Service

This is a fast api service that will be used to interact with the github api.
when this server url is added to a repo, it reads the metadata in the readme file to create a project that will be shown on my portfolio page.

## Metadata Format

```yaml
#the title of the project, different from the repo name
title: string
#description of the project
description: string
#list of technologies that are used.
technologies: [string]
#link to the repo
repo: string
#link to the deployed website, optional
website: string
```

## Example

```yaml
title: Portfolio
description: My portfolio website
technologies: [FastAPI, React, TypeScript, MongoDB]
repo: https://github.com/user/portfolio
website: https://user.com
```

If the metadata does not include at least the title and the description, it will not be updated.

## Usage

1. Add this url to your repo as a webhook
2. Push the changes to the main branch
3. Call this webhook to get a list of projects

## Testing

You can run this server on your local machine using the following line:

```bash
uvicorn main:app --reload --port 8000
```

And then tunnel it using ngrok to test it on a test repo.

```bash
ngrok http 8000
```

this will give you a url that you can use as the webhook url.
