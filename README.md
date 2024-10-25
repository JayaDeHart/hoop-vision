# Hoop Vision

[Hoop Vision](https://hoop-vision.vercel.app/)

#### Bet imaginary tokens on real basketball games to test prediction skills.

## Project Structure

Hoop Vision was bootstrapped using the T3 stack: https://create.t3.gg/. T3 is a modern web stack that prioritizes cutting-edge frameworks and typesafety.

### Database

Drizzle ORM is utilized to manage the database schema and query data efficiently, handling both migrations and schema pushes. During development, a local PostgreSQL database is used, while the production environment leverages Vercel's integrated PostgreSQL database.

### API

The application routes API calls through tRPC, which offers seamless integration with Drizzle and maintains typesafety from the database through to the frontend. This also enables rapid API endpoint creation after initial boilerplate setup. Fetch API is employed to retrieve basketball game data from a third-party API.

### Authentication

NextAuth handles user authentication, using OAuth providers as recommended for security and simplicity. Once configured, NextAuth provides comprehensive account, session, and token management out of the box. It integrates well with tRPC, enabling the creation of protected API routes.

### Styling and Components

The project is styled using Tailwind CSS, with UI components powered by Shadcn.

## Running the Project

### OAuth Setup

1. OAuth configuration details are located in `server/auth.ts`, where provider information can be adjusted as needed. Providers require some setup on the provider’s side, but once client IDs and secrets are obtained, they should be added to the `.env` file.

2. The file `env.js` performs type checking and variable validation; any missing or undefined variables will result in an error. Ensure that both `.env` and `env.js` contain matching variables, or `env.js` can be removed if validation is not needed.

### Running Database Seed

1. Sign in to the app using any OAuth account.
2. Execute either "db:seed:prod" or "db:seed:dev" to seed the database with sample games and bets. During seeding, use the same email as the OAuth account to ensure proper association.

### Scheduling Cron Job

1. The API route `/api/update-games` executes essential app logic, retrieving updated game data from the basketball API and updating any related bets.

2. Cron job scheduling is supported, with a template provided in `vercel.json`. Note that Vercel’s free tier limits scheduling frequency to once per day. To accommodate more frequent updates, QStash (https://upstash.com/docs/qstash/overall/getstarted) is recommended, allowing frequent API calls for free.

3. The basketball API has a daily query limit of 100 calls, so consider this when setting up the scheduling frequency to avoid overage.

## Resources and References

- [The T3 Stack](https://create.t3.gg/en/introduction)  
  A comprehensive stack of libraries and tools for a modern TypeScript project, complete with a CLI for easy bootstrapping.

- [Refactoring UI](https://www.refactoringui.com/)  
  A practical guide on designing web UIs, created by the authors of Tailwind CSS, and referenced during this project’s design phase.

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)  
  A thorough guide on best practices for Node.js and TypeScript applications, emphasizing production-level code quality and maintainability.

- [Supermaven](https://supermaven.com/)
  An in-editor code assist tool
