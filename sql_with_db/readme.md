# Doku

## Overview

This is an **Dockerized** and authentication-protected Todo App using **Node.js**, **Express.js**, **bcrypt**, **JWT authentication**, **Prisma**, and **PostgreSQL**. The app allows users to:
- **Register**: Create a new account.
- **Login**: Authenticate and receive a JWT token.
- **Manage Todos**: Perform auth protected CRUD operations on their own todo tasks after logging in.

## Project Structure

Here’s the corrected and complete project structure diagram for the auth-protected Todo App:

```
backend-todo-app/
│
├── public/
│   └── index.html              # The frontend HTML file for authentication and todo management
│
├── prisma/
│   ├── schema.prisma           # The frontend HTML file for authentication and todo management
│   └── migrations/             #
│
├── src/
│   ├── controllers/            # (Optional) For future separation of concerns
│   └── middlewares/
│       └── authMiddleware.js    # Middleware for verifying JWT and protecting routes
│   └── routes/
│       └── authRoutes.js        # Routes for user registration and login
│       └── todoRoutes.js        # Routes for authenticated CRUD operations on todos
│   └── prismaClient.js          # Prisma client database setup and table creation
│   └── server.js                # Main server entry point that sets up routing and middleware
│
├── Dockerfile                   # Docker container setup instructions
├── docker-compose.yaml          # Docker setup config file
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Lockfile for exact dependency versions
└── todo-app.rest                # REST client file for emulating API requests
```

### Example Workflow

1. **Define or Update Schema**: Modify the `schema.prisma` file to change your database structure.
2. **Create Migrations**: Use Prisma to generate and apply migrations.
3. **Run Docker Compose**: Build and run the Node.js app and PostgreSQL using Docker Compose.
4. **Interact with the API**: Use the frontend or API client (e.g., Postman) to register, login, and manage todos.

This project structure and workflow will help organize your code and make it easier to maintain and scale as your application grows.

## Getting Started

0. **Install Docker Desktop**

1. **Clone the Repository**:

```bash
git clone https://github.com/your-username/backend-todo-app.git
cd backend-todo-app
```

2. **Generate the Prisma Client**:

`npx prisma generate`

3. **Build your docker images**:

`docker compose build`

4. **Create PostgreSQL migrations and apply them**:

`docker compose run app npx prisma migrate dev --name init`

*Also* - to run/apply migrations if necessary:

`docker-compose run app npx prisma migrate deploy`

5. **Boot up 2x docker containers**:

`docker compose up`

*or*

`docker compose up -d`

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

6. **To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!**:

`docker exec -it postgres-db psql -U postgres -d todoapp`

7. **To stop Docker containers**:

`docker compose down`

8. **To delete all docker containers**:

`docker system prune`

9. **Access the App**:

Open `http://localhost:5003` (or `localhost:3000` if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.

## Emulating HTTP Requests (POSTMAN)

- **Registering a user**: Sends a `POST` request to create a new user.
- **Logging in**: Sends a `POST` request to authenticate a user and retrieve a JWT token.
- **Fetching todos**: Sends a `GET` request to fetch the authenticated user's todos (JWT required).
- **Adding a todo**: Sends a `POST` request to create a new todo (JWT required).
- **Updating a todo**: Sends a `PUT` request to update an existing todo (JWT required).
- **Deleting a todo**: Sends a `DELETE` request to remove a todo (JWT required).

