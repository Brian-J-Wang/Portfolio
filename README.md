# My Portfolio Website

## Development Setup

Starting a development server is easy. Make sure you have the following installed in your computer.

- Docker
- Node
- NPM
- Python

1. Create the following env files. Refer to the .env.example files in the respective app folders for which variables to fill in.
    - .env.backend
    - .env.mongo

    For the .env.backend file, you must have these values or otherwise the backend will not connect properly to mongodb.

    ```
    DB_USER="devUser"
    DB_PASS="devPassword"
    DB_HOST="mongo_db"
    GH_TOKEN=your_github_token_here
    ```

    For the .env.mongo file, the username and password fields must match the values in the .env.backend file. Otherwise, the backend will not be able to connect properly to the database.

    ```
    MONGO_INITDB_ROOT_USERNAME="devUser"
    MONGO_INITDB_ROOT_PASSWORD="devPassword"
    MONGO_INITDB_DATABASE="projects"
    ```

2. Run the following command:

    ```
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up --watch --build
    ```

3. To connect the backend to Github, it is recommended to use [ngrok](https://ngrok.com/) as a reverse proxy.

    ```
    ngrok http 4000
    ```

4. To start tracking a portfolio, add the forwarded URL appended with /github/webhook/ to the webhooks in github.
    ```
    - https://[random-domain].ngrok-free.app/github/webhook/
    ```
