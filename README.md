# NewsAt9 - News Aggregator

A modern news aggregator application built with React, TypeScript, and Tailwind CSS.

## Features

- Article search and filtering by keyword, date, category, and source
- Personalized news feed with customizable sources, categories, and authors
- Mobile responsive design
- Clean, modern UI with Tailwind CSS

## Running with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for easier management)

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd news-aggregator
   ```

2. Start the application:
   ```bash
   docker-compose up
   ```

3. Access the application at [http://localhost:8080](http://localhost:8080)

4. To stop the application:
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker Directly

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd news-aggregator
   ```

2. Build the Docker image:
   ```bash
   docker build -t news-aggregator .
   ```

3. Run the container:
   ```bash
   docker run -p 8080:80 news-aggregator
   ```

4. Access the application at [http://localhost:8080](http://localhost:8080)

## Development with Docker

For development with hot-reloading:

1. Modify the `docker-compose.yml` file by uncommenting the volumes and command sections.

2. Run the development container:
   ```bash
   docker-compose up
   ```

3. The application will be available at [http://localhost:8080](http://localhost:8080) with hot-reloading enabled.

## Environment Variables

For production deployment, you may need to set the following environment variables:

- `VITE_NEWS_API_KEY`: Your NewsAPI API key
- `VITE_GUARDIAN_API_KEY`: Your Guardian API key

You can set these in a `.env` file for local development or through your deployment platform for production.

## Building for Production

To build the application for production:

```bash
docker build -t news-aggregator:production .
docker run -p 80:80 news-aggregator:production
```

## Deployment

This Docker container can be deployed to any container hosting service like:

- AWS ECS
- Google Cloud Run
- Azure Container Instances
- Heroku
- Digital Ocean App Platform
- Netlify

## License

[MIT](LICENSE)