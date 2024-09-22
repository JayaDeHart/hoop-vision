# Hoop Vision

#### Bet imaginary tokens on real basketball games to test your prediction skills

## Project Structure

This project was bootstrapped using the t3 stack: https://create.t3.gg/

### Database

I used drizzle to handle creating the database schema and querying data from it. Drizzle also handles database migrations / schema pushes. I used a local postgres database for development and the integrated vercel postgres db in production.

### API

I used tRPC for all of the api routing that involves my database. This integrates really well as it maintains typesafety all the way from db->frontend. It also just makes adding new api endpoints really fast once you've set up all the boilerplate. To get the basketball game data from the third party api I just used fetch()

### Auth

I used next-auth. It takes care of pretty much everything out of the box.

### Styling + Components

I used tailwind css and shadcn.

## Running The Project

### Oauth

1. server/auth.ts is where you plug your oauth details into the next-auth config. You don't need to implement all of them, or you could implement more than the ones I've set up. There will be some configuration to do on the provider side for each, but once you get your client id and secret, make a .env file and plug those in.

2. env.js does some typechecking and validating stuff, so you need to make sure you have all the same variables in there as in .env or it will throw an error. Or you can just delete env.js if you feel like doing without all that.

### Running Database Seed:

1. Sign in to the app with any oauth account
2. Run the script: "db:seed:prod" or "db:seed:dev". You will be promted to enter an email, make sure you use the same one as your oauth account. It will seed either your production or development database with some sample games and bets.

### Scheduling Cron Job

1. The api route /api/update-games executes a lot of the core app logic.
   It gets an updated list of games from the basketball api. It also updates the bets that contain any of the newly queried games.

2. You can use a cron job to schedule it. vercel.json contains the template for doing that, but free tier vercel accounts can only schedule crons with a frequency of 1x/day or slower. Obviously this would be insufficient, as users would be able to bet on games that had already transpired.

3. I used qstash: https://upstash.com/docs/qstash/overall/getstarted. You can schedule api calls with a much higher frequency for free. The other limit you will run into is the basketball api query limit of 100 calls per day, so make sure you're not scheduling them too frequently.
