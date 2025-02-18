# Vehicle Management System

A full-stack application for managing vehicles, built with React, NestJS, and PostgreSQL.

## 🚀 Quick Start with Docker Compose

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd csv-mui-react-assighment
```

2. Start the application using Docker Compose:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

This command will:
- Build and start the PostgreSQL database
- Build and start the NestJS backend
- Build and start the React frontend
- Set up all necessary connections between services

3. Access the application:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Database: localhost:5432

### Stopping the Application

To stop all services:
```bash
docker-compose -f docker-compose.dev.yml down
```

To stop and remove all containers, networks, and volumes:
```bash
docker-compose -f docker-compose.dev.yml down -v
```

## 🛠️ Development

### Project Structure

```
.
├── backend/                 # NestJS backend application
│   ├── src/                # Source files
│   ├── prisma/            # Database schema and migrations
│   └── Dockerfile.dev     # Development Dockerfile for backend
├── src/                    # React frontend application
├── Dockerfile.dev         # Development Dockerfile for frontend
└── docker-compose.dev.yml # Docker Compose configuration
```

### Available Docker Compose Commands

```bash
# Start the application in development mode
npm run docker:dev

# Stop the application
npm run docker:dev:down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# View logs for a specific service
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f postgres
```

### Troubleshooting

1. If the frontend can't connect to the backend:
   - Ensure all containers are running: `docker ps`
   - Check backend logs for CORS issues
   - Verify the API URL in the frontend configuration

2. If the database connection fails:
   - Ensure the PostgreSQL container is healthy
   - Check the database credentials in docker-compose.dev.yml
   - Verify the DATABASE_URL in the backend environment

3. If containers won't stop or remove:
   - Force remove all containers: `docker rm -f $(docker ps -aq)`
   - Prune Docker system: `docker system prune -af --volumes`

## 🔧 Running Without Docker

You can also run each service individually:

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Database

You'll need to install and configure PostgreSQL locally if not using Docker.
