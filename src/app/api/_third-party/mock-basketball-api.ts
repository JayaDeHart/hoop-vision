import {
  type GameWithOdds,
  type GameResponse,
  type HomeAwayBet,
} from "~/app/types";

const mockGameResponse = {
  get: "games",
  parameters: {
    date: "2024-08-29",
  },
  errors: [],
  results: 14,
  response: [
    {
      id: 384945,
      date: "2024-08-29T00:00:00+00:00",
      time: "00:00",
      timestamp: 1724889600,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Wintrust Arena",
      status: {
        long: "Game Finished",
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
          id: 163,
          name: "Chicago Sky W",
          logo: "https://media.api-sports.io/basketball/teams/163.png",
        },
        away: {
          id: 175,
          name: "Washington Mystics W",
          logo: "https://media.api-sports.io/basketball/teams/175.png",
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
    },
  ],
};

const mockGameResponse2 = {
  get: "games",
  parameters: {
    date: "2024-08-30",
  },
  errors: [],
  results: 6,
  response: [
    {
      id: 384945,
      date: "2024-08-29T00:00:00+00:00",
      time: "00:00",
      timestamp: 1724889600,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Wintrust Arena",
      status: {
        long: "Game Finished",
        short: "FT",
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
          id: 163,
          name: "Chicago Sky W",
          logo: "https://media.api-sports.io/basketball/teams/163.png",
        },
        away: {
          id: 175,
          name: "Washington Mystics W",
          logo: "https://media.api-sports.io/basketball/teams/175.png",
        },
      },
      scores: {
        home: {
          quarter_1: 1,
          quarter_2: 2,
          quarter_3: 3,
          quarter_4: 4,
          over_time: null,
          total: 10,
        },
        away: {
          quarter_1: 1,
          quarter_2: 1,
          quarter_3: 1,
          quarter_4: 1,
          over_time: null,
          total: 12,
        },
      },
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockOddsResponse = {
  get: "odds",
  parameters: {
    game: "419093",
  },
  errors: [],
  results: 1,
  response: [
    {
      league: {
        id: 275,
        name: "Superliga",
        type: "League",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/275.png",
      },
      country: {
        id: 61,
        name: "Venezuela",
        code: "VE",
        flag: "https://media.api-sports.io/flags/ve.svg",
      },
      game: {
        id: 419093,
        date: "2024-09-09T23:00:00+00:00",
        time: "23:00",
        timestamp: 1725922800,
        timezone: "UTC",
        stage: null,
        week: "Superliga - Final",
        venue: "Gimnasio Luis Ramos",
        status: {
          long: "Game Finished",
          short: "FT",
          timer: null,
        },
        league: {
          id: 275,
          name: "Superliga",
          type: "League",
          season: 2024,
          logo: "https://media.api-sports.io/basketball/leagues/275.png",
        },
        country: {
          id: 61,
          name: "Venezuela",
          code: "VE",
          flag: "https://media.api-sports.io/flags/ve.svg",
        },
        teams: {
          home: {
            id: 3986,
            name: "Gladiadores",
            logo: "https://media.api-sports.io/basketball/teams/3986.png",
          },
          away: {
            id: 1559,
            name: "Guaiqueries",
            logo: "https://media.api-sports.io/basketball/teams/1559.png",
          },
        },
        scores: {
          home: {
            quarter_1: 23,
            quarter_2: 18,
            quarter_3: 18,
            quarter_4: 15,
            over_time: null,
            total: 74,
          },
          away: {
            quarter_1: 13,
            quarter_2: 15,
            quarter_3: 23,
            quarter_4: 12,
            over_time: null,
            total: 63,
          },
        },
      },
      bookmakers: [
        {
          id: 2,
          name: "Marathon Bet",
          bets: [
            {
              id: 1,
              name: "3Way Result",
              values: [
                {
                  value: "Home",
                  odd: "1.43",
                },
                {
                  value: "Draw",
                  odd: "13.75",
                },
                {
                  value: "Away",
                  odd: "3.02",
                },
              ],
            },
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.39",
                },
                {
                  value: "Away",
                  odd: "2.80",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export async function getMockTodaysGames(): Promise<GameResponse[]> {
  return mockGameResponse.response;
}

export function getMockGamesWithOdds(): GameWithOdds[] {
  const games: GameResponse[] = mockGameResponse.response;
  const bet: HomeAwayBet = {
    game: 419093,
    bookmaker: "Mock Data",
    bet: {
      id: 2,
      name: "Home/Away",
      values: [
        {
          value: "Home",
          odd: "1.39",
        },
        {
          value: "Away",
          odd: "2.80",
        },
      ],
    },
  };
  return games
    .filter((game) => game.status.short === "NS")
    .map((game) => ({ game, odds: bet }));
}

export function getMockGamesWithOddsUpdate(): GameWithOdds[] {
  const games: GameResponse[] = mockGameResponse2.response;
  const bet: HomeAwayBet = {
    game: 419093,
    bookmaker: "Mock Data",
    bet: {
      id: 2,
      name: "Home/Away",
      values: [
        {
          value: "Home",
          odd: "1.39",
        },
        {
          value: "Away",
          odd: "2.80",
        },
      ],
    },
  };
  return games.map((game) => ({ game, odds: bet }));
}
