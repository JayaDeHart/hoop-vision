const getGameData = {
  callApiforGameData: {
    sortGamesintoCompleteAndIncomplete: {
      complete: {
        upDateGamesTableWithResults: "end",
        upDateBetsTableWithResults: "end",
      },
      incomplete: {
        addToGamesDatabase: "end",
        serveToFrontEnd: "end",
      },
    },
  },
};

const placeBet = {
  selectGameAndOutcome: {
    storeUserBetInTable: "end",
  },
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
          quarter_1: 20,
          quarter_2: 19,
          quarter_3: 19,
          quarter_4: 12,
          over_time: null,
          total: 70,
        },
        away: {
          quarter_1: 22,
          quarter_2: 22,
          quarter_3: 10,
          quarter_4: 20,
          over_time: null,
          total: 74,
        },
      },
    },
    {
      id: 415881,
      date: "2024-08-30T09:00:00+00:00",
      time: "09:00",
      timestamp: 1725008400,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Ninoy Aquino Stadium",
      status: {
        long: "Game Finished",
        short: "FT",
        timer: null,
      },
      league: {
        id: 152,
        name: "Governors Cup",
        type: "cup",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/152.png",
      },
      country: {
        id: 60,
        name: "Philippines",
        code: "PH",
        flag: "https://media.api-sports.io/flags/ph.svg",
      },
      teams: {
        home: {
          id: 2774,
          name: "Rain or Shine Elasto Painters",
          logo: "https://media.api-sports.io/basketball/teams/2774.png",
        },
        away: {
          id: 2773,
          name: "Phoenix Fuelmasters",
          logo: "https://media.api-sports.io/basketball/teams/2773.png",
        },
      },
      scores: {
        home: {
          quarter_1: 19,
          quarter_2: 36,
          quarter_3: 29,
          quarter_4: 32,
          over_time: null,
          total: 116,
        },
        away: {
          quarter_1: 29,
          quarter_2: 26,
          quarter_3: 21,
          quarter_4: 23,
          over_time: null,
          total: 99,
        },
      },
    },
    {
      id: 415882,
      date: "2024-08-30T11:30:00+00:00",
      time: "11:30",
      timestamp: 1725017400,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Ninoy Aquino Stadium",
      status: {
        long: "Game Finished",
        short: "FT",
        timer: null,
      },
      league: {
        id: 152,
        name: "Governors Cup",
        type: "cup",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/152.png",
      },
      country: {
        id: 60,
        name: "Philippines",
        code: "PH",
        flag: "https://media.api-sports.io/flags/ph.svg",
      },
      teams: {
        home: {
          id: 2767,
          name: "Barangay Ginebra San Miguel",
          logo: "https://media.api-sports.io/basketball/teams/2767.png",
        },
        away: {
          id: 3080,
          name: "Blackwater Bossing",
          logo: "https://media.api-sports.io/basketball/teams/3080.png",
        },
      },
      scores: {
        home: {
          quarter_1: 21,
          quarter_2: 23,
          quarter_3: 20,
          quarter_4: 24,
          over_time: null,
          total: 88,
        },
        away: {
          quarter_1: 20,
          quarter_2: 26,
          quarter_3: 31,
          quarter_4: 18,
          over_time: null,
          total: 95,
        },
      },
    },
    {
      id: 401266,
      date: "2024-08-30T12:30:00+00:00",
      time: "12:30",
      timestamp: 1725021000,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Ho Xuan Huong Gymnasium",
      status: {
        long: "After Over Time",
        short: "AOT",
        timer: null,
      },
      league: {
        id: 276,
        name: "VBA",
        type: "League",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/276.png",
      },
      country: {
        id: 70,
        name: "Vietnam",
        code: "VN",
        flag: "https://media.api-sports.io/flags/vn.svg",
      },
      teams: {
        home: {
          id: 3993,
          name: "Da Nang Dragons",
          logo: "https://media.api-sports.io/basketball/teams/3993.png",
        },
        away: {
          id: 3995,
          name: "Ho Chi Minh City Wings",
          logo: "https://media.api-sports.io/basketball/teams/3995.png",
        },
      },
      scores: {
        home: {
          quarter_1: 12,
          quarter_2: 34,
          quarter_3: 24,
          quarter_4: 10,
          over_time: 16,
          total: 96,
        },
        away: {
          quarter_1: 25,
          quarter_2: 17,
          quarter_3: 17,
          quarter_4: 21,
          over_time: 13,
          total: 93,
        },
      },
    },
    {
      id: 384949,
      date: "2024-08-30T23:30:00+00:00",
      time: "23:30",
      timestamp: 1725060600,
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
          id: 166,
          name: "Indiana Fever W",
          logo: "https://media.api-sports.io/basketball/teams/166.png",
        },
      },
      scores: {
        home: {
          quarter_1: 26,
          quarter_2: 16,
          quarter_3: 22,
          quarter_4: 17,
          over_time: null,
          total: 81,
        },
        away: {
          quarter_1: 23,
          quarter_2: 24,
          quarter_3: 31,
          quarter_4: 22,
          over_time: null,
          total: 100,
        },
      },
    },
    {
      id: 384950,
      date: "2024-08-30T23:30:00+00:00",
      time: "23:30",
      timestamp: 1725060600,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "College Park Center",
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
          id: 165,
          name: "Dallas Wings W",
          logo: "https://media.api-sports.io/basketball/teams/165.png",
        },
        away: {
          id: 169,
          name: "Minnesota Lynx W",
          logo: "https://media.api-sports.io/basketball/teams/169.png",
        },
      },
      scores: {
        home: {
          quarter_1: 22,
          quarter_2: 17,
          quarter_3: 29,
          quarter_4: 26,
          over_time: null,
          total: 94,
        },
        away: {
          quarter_1: 18,
          quarter_2: 22,
          quarter_3: 19,
          quarter_4: 17,
          over_time: null,
          total: 76,
        },
      },
    },
  ],
};
