/* eslint-disable */

import {
  GameResponse,
  GamesApiResponse,
  GameWithOdds,
  HomeAwayBet,
} from "~/app/types";
import {
  getMockGamesWithOdds,
  getMockGamesWithOddsUpdate,
} from "./mock-basketball-api";

export async function getTodaysGames(): Promise<GameResponse[]> {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api-basketball.p.rapidapi.com/games?date=${today}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ec1dd97c84msh31ae883df33e45ap1b4de7jsnf66a22ff8a58",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch games data");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: GamesApiResponse = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.response;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Could not fetch games");
  }
}

export async function getOddsByGames(ids: number[]): Promise<HomeAwayBet[]> {
  const oddsPromises = ids.map((id) => getOddsByGame(id));

  try {
    const results = await Promise.all(oddsPromises);
    return results;
  } catch (error) {
    console.error("Error fetching odds for multiple games:", error);
    throw new Error("Could not fetch odds for all games");
  }
}

export async function getOddsByGame(
  id: number,
  retries = 3,
  delay = 50000,
): Promise<HomeAwayBet> {
  const url = `https://api-basketball.p.rapidapi.com/odds?game=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ec1dd97c84msh31ae883df33e45ap1b4de7jsnf66a22ff8a58",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return getOddsByGame(id, retries - 1, delay * 2); // Exponential backoff
      }
      return {
        game: id || 0,
        bookmaker: "none",
        bet: null,
      };
      // throw new Error(`Failed to fetch odds data: ${response.status}`);
    }

    const result = await response.json();
    if (result.results > 0) {
      return getHomeAwayBet(result);
    } else {
      return {
        game: Number(result.parameters.game) || 0,
        bookmaker: "none",
        bet: null,
      };
    }
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Could not fetch games");
  }
}

function getHomeAwayBet(data: any): HomeAwayBet {
  const gameId = data.response[0].game.id;

  for (const bookmaker of data.response[0].bookmakers) {
    const bet = bookmaker.bets.find((b: any) => b.name === "Home/Away");
    if (bet) {
      return {
        game: gameId,
        bookmaker: bookmaker.name,
        bet: bet,
      };
    }
  }
  return {
    game: gameId,
    bookmaker: "none",
    bet: null,
  };
}

export function linkGamesWithBets(
  games: GameResponse[],
  bets: HomeAwayBet[],
): GameWithOdds[] {
  return games
    .map((game) => {
      const bet = bets.find((b) => b.game === game.id);
      if (bet) {
        return {
          game: game,
          odds: bet,
        };
      }
      return null;
    })
    .filter((item): item is GameWithOdds => item !== null);
}

export async function getGamesWithOdds(triggerManualUpdate: boolean) {
  if (process.env.USE_MOCK_DATA) {
    return triggerManualUpdate
      ? getMockGamesWithOddsUpdate()
      : getMockGamesWithOdds();
  } else {
    const games = await getTodaysGames();
    const odds = await getOddsByGames(games.map((game) => game.id));
    return linkGamesWithBets(games, odds);
  }
}

export function getWinningTeam(game: GameResponse): {
  winner: string;
  position: string | null;
} {
  if (game.status.short === "NS") {
    return {
      winner: "pending",
      position: null,
    };
  }

  if (game.scores.home.total === null || game.scores.away.total === null) {
    return {
      winner: "pending",
      position: null,
    };
  }

  if (game.scores.home.total > game.scores.away.total) {
    return {
      winner: game.teams.home.name,
      position: "home",
    };
  } else {
    return {
      winner: game.teams.away.name,
      position: "away",
    };
  }
}

//we can rewrite this workflow to be much more effecient
//we only need to get the odds for games that are NS
//for all others we can just get the game info
//we need to update the db model to allow for storing games without odds
//but there will be no negative impact on not getting odds for games that are over, because we theoretically should have them in our DB already
