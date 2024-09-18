import { users, bets, games } from "./schema";
import { db } from ".";
import { eq } from "drizzle-orm";
import { createInterface } from "readline";

export async function seed(email: string | null = null) {
  // Replace this with the actual email or some identifier of the signed-in user
  const userEmail = email ?? "";

  // 1. Fetch the user from the database by email
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, userEmail));

  // 2. Throw an error if no user is found
  if (!user) {
    throw new Error(
      "No user found! Please sign in before running the seed script.",
    );
  }

  const userId = user.id;

  //Not Started Game
  const gameOneData = {
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

  //Completed Game 1
  const gameTwoData = {
    id: 415960,
    date: "2024-09-17T00:30:00+00:00",
    time: "00:30",
    timestamp: 1726533000,
    timezone: "UTC",
    stage: null,
    week: null,
    venue: "Efigenio Gonzalez",
    status: {
      long: "Game Finished",
      short: "FT",
      timer: null,
    },
    league: {
      id: 258,
      name: "LNB",
      type: "League",
      season: 2024,
      logo: "https://media.api-sports.io/basketball/leagues/258.png",
    },
    country: {
      id: 67,
      name: "Paraguay",
      code: "PY",
      flag: "https://media.api-sports.io/flags/py.svg",
    },
    teams: {
      home: {
        id: 4936,
        name: "Felix Perez Cardozo",
        logo: "https://media.api-sports.io/basketball/teams/4936.png",
      },
      away: {
        id: 3900,
        name: "Dep. San Jose",
        logo: "https://media.api-sports.io/basketball/teams/3900.png",
      },
    },
    scores: {
      home: {
        quarter_1: 31,
        quarter_2: 10,
        quarter_3: 15,
        quarter_4: 15,
        over_time: null,
        total: 71,
      },
      away: {
        quarter_1: 18,
        quarter_2: 26,
        quarter_3: 26,
        quarter_4: 20,
        over_time: null,
        total: 90,
      },
    },
  };

  //Completed Game 2
  const gameThreeData = {
    id: 419913,
    date: "2024-09-17T08:00:00+00:00",
    time: "08:00",
    timestamp: 1726560000,
    timezone: "UTC",
    stage: null,
    week: null,
    venue: null,
    status: {
      long: "Game Finished",
      short: "FT",
      timer: null,
    },
    league: {
      id: 159,
      name: "Russian Cup",
      type: "cup",
      season: "2024-2025",
      logo: "https://media.api-sports.io/basketball/leagues/159.png",
    },
    country: {
      id: 39,
      name: "Russia",
      code: "RU",
      flag: "https://media.api-sports.io/flags/ru.svg",
    },
    teams: {
      home: {
        id: 2790,
        name: "Dynamo MGTU",
        logo: "https://media.api-sports.io/basketball/teams/2790.png",
      },
      away: {
        id: 2791,
        name: "Dynamo Stavropol",
        logo: "https://media.api-sports.io/basketball/teams/2791.png",
      },
    },
    scores: {
      home: {
        quarter_1: 24,
        quarter_2: 15,
        quarter_3: 13,
        quarter_4: 13,
        over_time: null,
        total: 65,
      },
      away: {
        quarter_1: 20,
        quarter_2: 13,
        quarter_3: 30,
        quarter_4: 27,
        over_time: null,
        total: 90,
      },
    },
  };

  // 3. Seed the games table
  await db.insert(games).values([
    {
      id: "384995",
      teamA: "Washington Mystics W",
      teamB: "New York Liberty W",
      oddsTeamA: 1.5,
      oddsTeamB: 2.5,
      gameDate: new Date(),
      status: "NS",
      winner: "pending",
      gameData: gameOneData,
    },
    {
      id: "415960",
      teamA: "Felix Perez Cardozo",
      teamB: "Dep. San Jose",
      oddsTeamA: 1.7,
      oddsTeamB: 2.2,
      gameDate: new Date(Date.now() - 86400000), // Finished game
      status: "FT",
      winner: "Dep. San Jose",
      gameData: gameTwoData,
    },
    {
      id: "419913",
      teamA: "Dynamo MGTU",
      teamB: "Dynamo Stavropol",
      oddsTeamA: 1.7,
      oddsTeamB: 2.2,
      gameDate: new Date(Date.now() - 86400000), // Finished game
      status: "FT",
      winner: "Dynamo Stavropol",
      gameData: gameThreeData,
    },
  ]);

  // 4. Seed the bets table, linking the bets to the real user
  await db.insert(bets).values([
    {
      id: "1",
      userId, // Reference the real user
      gameId: "415960", // Completed Game 1
      amount: 100,
      chosenTeam: "Felix Perez Cardozo", // Team A from Game 2
      result: "loss", // Chose Team A, but Team B won
      payout: 0,
    },
    {
      id: "2",
      userId, // Reference the real user
      gameId: "415960", // Completed Game 1
      amount: 100,
      chosenTeam: "Dep. San Jose", // Team B from Game 2
      result: "win", // Chose Team B, which won
      payout: 220, // Example payout based on odds of 2.2
    },
    {
      id: "3",
      userId, // Reference the real user
      gameId: "384995", // Not Started Game
      amount: 100,
      chosenTeam: "Washington Mystics W", // Team A from Game 1
      result: "pending", // Game hasn't started yet
      payout: 0,
    },
  ]);

  console.log("Seed complete for user:", user.email);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your email: ", (email) => {
  rl.close();
  seed(email)
    .then(() => {
      console.log("Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
    });
});
