import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/server/db/schema";
import { eq } from "drizzle-orm";
import { expect } from "chai";
import { execSync } from "child_process";

export const initialzieDb = async () => {
  const postgresContainer = await new PostgreSqlContainer().start();
  const connectionString = postgresContainer.getConnectionUri();
  const db = postgresDrizzle(postgres(connectionString), { schema });

  execSync(
    `npx drizzle-kit push --dialect=postgresql --schema=./src/server/db/schema.ts --url=${connectionString}`,
    {
      stdio: "pipe",
      encoding: "utf-8",
    },
  );

  return db;
};

export const gameOneData = {
  id: 384995,
  date: "2024-09-17T23:00:00+00:00",
  time: "23:00",
  timestamp: 1726614000,
  timezone: "UTC",
  stage: null,
  week: null,
  venue: "Entertainment and Sports Arena",
  status: {
    long: "Not Started",
    short: "NS",
    timer: null,
  },
  league: {
    id: 13,
    name: "NBA W",
    type: "League",
    season: 2024,
    logo: "https://media.api-sports.io/basketball/leagues/13.png",
  },
  country: {
    id: 5,
    name: "USA",
    code: "US",
    flag: "https://media.api-sports.io/flags/us.svg",
  },
  teams: {
    home: {
      id: 175,
      name: "Washington Mystics W",
      logo: "https://media.api-sports.io/basketball/teams/175.png",
    },
    away: {
      id: 170,
      name: "New York Liberty W",
      logo: "https://media.api-sports.io/basketball/teams/170.png",
    },
  },
  scores: {
    home: {
      quarter_1: null,
      quarter_2: null,
      quarter_3: null,
      quarter_4: null,
      over_time: null,
      total: null,
    },
    away: {
      quarter_1: null,
      quarter_2: null,
      quarter_3: null,
      quarter_4: null,
      over_time: null,
      total: null,
    },
  },
};

export const game = {
  id: "1",
  homeTeam: "Washington Mystics W",
  awayTeam: "New York Liberty W",
  oddsHomeTeam: 1.5,
  oddsAwayTeam: 2.5,
  gameDate: new Date(),
  status: "NS",
  winner: "pending",
  gameData: gameOneData,
};
