# Todo Backend (NestJS & PostgreSQL)

This project is a REST API backend for a simple Todo application, built with NestJS and using PostgreSQL for data storage.

## Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- Docker and Docker Compose

## Setup & Installation

1.  **Clone the repository (or ensure you are in the `todo-backend` directory).**
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    *   The application uses TypeORM for database connection. Configuration is in `src/app.module.ts`.
    *   By default, it connects to a PostgreSQL database configured via `docker-compose.yml`.
    *   Ensure the database credentials in `src/app.module.ts` match those in `docker-compose.yml` or use environment variables (future improvement).

## Running the Application

1.  **Start the PostgreSQL database using Docker Compose:**
    ```bash
    docker-compose up -d
    ```
    This will start a PostgreSQL container, and data will be persisted in a `./pgdata` volume.
    To stop the database: `docker-compose down`

2.  **Run the NestJS application:**
    ```bash
    npm run start:dev
    ```
    The application will be available at `http://localhost:3000` by default.

## API Endpoints

-   `POST /todos`: Create a new todo.
    -   Body: `{ "title": "string", "description": "string" (optional) }`
-   `GET /todos`: Get all todos.
-   `GET /todos/:id`: Get a todo by its ID.
-   `PUT /todos/:id`: Update a todo by its ID.
    -   Body: `{ "title": "string" (optional), "description": "string" (optional), "isCompleted": "boolean" (optional) }`
-   `DELETE /todos/:id`: Delete a todo by its ID.

## Running Tests

```bash
npm run test
```
This will run unit tests for the services.
