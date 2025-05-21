# Todo Frontend (Next.js)

This is a Next.js frontend for a simple Todo application. It interacts with the Todo Backend API.

## Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

## Setup & Installation

1.  **Clone the repository (or ensure you are in the `todo-frontend` directory).**
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **API Configuration:**
    *   The frontend connects to the backend API. The base URL is configured in `app/config.js`.
    *   By default, it's set to `http://localhost:3000`. Ensure the backend is running and accessible at this URL.

## Running the Application

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3001` by default (or another port if 3001 is busy).

## Features

- View a list of todos.
- Add new todos.
- Mark todos as complete/incomplete.
- Delete todos.
- Basic loading and error states.
