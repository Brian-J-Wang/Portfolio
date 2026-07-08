# Astro Server

This is the Astro-based frontend for the portfolio project. It is configured for Server-Side Rendering (SSR) using the standalone Node.js adapter and styled with Tailwind CSS v4. It connects with the backend to retrieve github projects

## Features

- **Astro**: Fast, content-focused web framework.
- **Node.js SSR**: Uses `@astrojs/node` in standalone mode for server-side rendering.
- **Tailwind CSS**: Integrated with Vite and Tailwind CSS v4.
- **Code Quality**: ESLint and Prettier configured for code formatting and linting.
- **Docker Ready**: Includes a Dockerfile for easy containerization.

## Getting Started

### Prerequisites

- Node.js (>= 22.12.0)
- npm

### Installation

Install the project dependencies:

```sh
npm install
```

### Development

Start the local development server:

```sh
npm run dev
```

The app will be available at `http://localhost:4321`.

### Build and Preview

Build the application for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Docker Deployment

A `Dockerfile` is provided to run the application in a container.

Build the Docker image:

```sh
docker build -t astro-server .
```

Run the container:

```sh
docker run -p 4321:4321 astro-server
```

The server will be exposed on port `4321` inside the container and mapped to port `4321` on your host.

## Scripts

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm run dev`     | Starts the local dev server at `localhost:4321` |
| `npm run build`   | Builds the production site to `./dist/`         |
| `npm run preview` | Previews the build locally                      |
| `npm run lint`    | Runs ESLint on the project                      |
| `npm run format`  | Runs Prettier to format code                    |
