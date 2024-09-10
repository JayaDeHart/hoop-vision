/* eslint-disable */

import { GameResponse, GamesApiResponse, HomeAwayBet } from "~/app/types";

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
    return result.response.filter((game) => game.status.short === "NS");
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

export async function getOddsByGame(id: number): Promise<HomeAwayBet> {
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
      throw new Error("Failed to fetch odds data");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();
    console.log(result);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
): [GameResponse, HomeAwayBet][] {
  return games
    .map((game) => {
      const bet = bets.find((b) => b.game === game.id);
      if (bet) {
        return [game, bet];
      }
      return null;
    })
    .filter((item): item is [GameResponse, HomeAwayBet] => item !== null);
}
