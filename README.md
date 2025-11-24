Production API

A TypeScript based REST API using Express and Mongoose. This repository contains a modular codebase focused on user authentication, session management, and product resource handling. The codebase is configured for local development, testing, building and containerization.

## Key features

1. JSON web token based authentication with access token and refresh token
2. Persistent session management stored in MongoDB
3. Product resource create read update delete workflow with ownership checks
4. Structured validation using Zod schemas
5. Basic metrics endpoint via a separate metrics server
6. Docker friendly build output in the `dist` directory

## Technology stack

1. Node and TypeScript
2. Express for HTTP routing
3. Mongoose for MongoDB models
4. Zod for data validation
5. Pino for structured logging
6. Jest and Supertest for tests
7. pnpm for package management
8. Docker for container image

## Requirements

1. Node version compatible with the project
2. pnpm installed globally or use the package manager of your choice
3. MongoDB instance accessible with credentials
4. Environment variables configured

## Quick start

1. Clone the repository to your machine.
2. Create a file named `env` or use your environment management flow to provide required variables.
3. Install dependencies

Use the following command in the project root
`pnpm install`

4. Run the development server

Use the following command in the project root
`pnpm run dev`

5. Build for production

Use the following command in the project root
`pnpm run build`

6. Run tests

Use the following command in the project root
`pnpm test`

## Environment variables

Provide the following values in your environment or a local file loaded by `dotenv`

1. `MONGODB_USER` database account name
2. `MONGODB_PASSWD` database account password
3. `PUBLIC_KEY` RSA public key for token verification
4. `PRIVATE_KEY` RSA private key for token signing
5. `PORT` optional server port override

Configuration defaults are defined in `config/default.ts`

## Docker

The repository includes a `Dockerfile` that produces a production artifact in the `dist` directory. Build the image using standard Docker tooling and run the container in a way that maps ports and sets environment variables appropriate to your environment.

The `Dockerfile` installs dependencies, builds the TypeScript output and expects the server entry file at `dist/src/index.js`

## Project layout

1. `package.json` package and script definitions
2. `Dockerfile` container build instructions
3. `config` application configuration files
4. `src/index.ts` application entry point
5. `src/routes.ts` route registration and endpoint definitions
6. `src/controllers` controllers for user session and product logic
7. `src/services` business logic and database interactions
8. `src/models` Mongoose schemas and models
9. `src/schema` Zod request schemas for validation
10. `src/middlewares` request middleware like authentication and validation
11. `src/utils` helpers for logging JWT and server creation
12. `src/__tests__` test coverage for API behavior

Examples of important files
`package.json`
`Dockerfile`
`src/index.ts`
`src/routes.ts`
`config/default.ts`

## API highlights

1. Health probe endpoint
   GET `/healthcheck` responds with status two hundred on success

2. User endpoints
   POST `/api/users` create a new user

3. Session endpoints
   POST `/api/sessions` create a session and return access token with refresh token
   GET `/api/sessions` list active sessions for the current user
   DELETE `/api/sessions` invalidate the current session

4. Product endpoints
   POST `/api/product` create a new product for authenticated user
   GET `/api/Product/:ProductId` fetch a product by id
   PUT `/api/Product/:ProductId` update a product owned by the authenticated user
   DELETE `/api/Product/:ProductId` remove a product owned by the authenticated user

All API endpoints that require authentication rely on middleware that populates `res.locals.user` with the verified user object

## Testing notes

1. Unit and integration tests are implemented using Jest and Supertest
2. Test configuration is present in `jest.config.js`
3. Test files are located under `src/__tests__`

## Logging and metrics

1. Structured logs are produced using the logger in `src/utils/logger.ts`
2. A lightweight metrics server is started from the application entry to expose Prometheus compatible metrics

## Common commands reference

1. `pnpm install` install dependencies
2. `pnpm run dev` start the development server with automatic rebuilds
3. `pnpm run build` compile TypeScript to JavaScript into the `dist` directory
4. `pnpm test` run the test suite

## Contribution and next steps

1. Add missing type annotations where the code reports ambiguities
2. Improve error handling for cases where requests hang due to missing payload values
3. Add integration tests for authentication flows and product ownership checks
4. Consider centralized request error formatter for consistent API responses

## License and contact

1. Check `package.json` for license information
2. For questions about the implementation or to request changes open an issue or a pull request in the repository
