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
      id: 416733,
      date: "2024-08-29T00:00:00+00:00",
      time: "00:00",
      timestamp: 1724889600,
      timezone: "UTC",
      stage: null,
      week: "LNB - Final",
      venue: null,
      status: {
        long: "Game Finished",
        short: "FT",
        timer: null,
      },
      league: {
        id: 380,
        name: "LNB",
        type: "League",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/380.png",
      },
      country: {
        id: 73,
        name: "Dominican-Republic",
        code: "DO",
        flag: "https://media.api-sports.io/flags/do.svg",
      },
      teams: {
        home: {
          id: 4981,
          name: "Reales de la Vega",
          logo: "https://media.api-sports.io/basketball/teams/4981.png",
        },
        away: {
          id: 4982,
          name: "Titanes Del Licey",
          logo: "https://media.api-sports.io/basketball/teams/4982.png",
        },
      },
      scores: {
        home: {
          quarter_1: 18,
          quarter_2: 19,
          quarter_3: 17,
          quarter_4: 20,
          over_time: null,
          total: 74,
        },
        away: {
          quarter_1: 21,
          quarter_2: 25,
          quarter_3: 12,
          quarter_4: 27,
          over_time: null,
          total: 85,
        },
      },
    },
    {
      id: 384946,
      date: "2024-08-29T02:00:00+00:00",
      time: "02:00",
      timestamp: 1724896800,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Crypto.com Arena",
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
          id: 168,
          name: "Los Angeles Sparks W",
          logo: "https://media.api-sports.io/basketball/teams/168.png",
        },
        away: {
          id: 170,
          name: "New York Liberty W",
          logo: "https://media.api-sports.io/basketball/teams/170.png",
        },
      },
      scores: {
        home: {
          quarter_1: 26,
          quarter_2: 20,
          quarter_3: 21,
          quarter_4: 27,
          over_time: null,
          total: 94,
        },
        away: {
          quarter_1: 14,
          quarter_2: 25,
          quarter_3: 24,
          quarter_4: 25,
          over_time: null,
          total: 88,
        },
      },
    },
    {
      id: 384947,
      date: "2024-08-29T02:00:00+00:00",
      time: "02:00",
      timestamp: 1724896800,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Footprint Center",
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
          id: 171,
          name: "Phoenix Mercury W",
          logo: "https://media.api-sports.io/basketball/teams/171.png",
        },
        away: {
          id: 169,
          name: "Minnesota Lynx W",
          logo: "https://media.api-sports.io/basketball/teams/169.png",
        },
      },
      scores: {
        home: {
          quarter_1: 15,
          quarter_2: 22,
          quarter_3: 15,
          quarter_4: 24,
          over_time: null,
          total: 76,
        },
        away: {
          quarter_1: 25,
          quarter_2: 21,
          quarter_3: 25,
          quarter_4: 18,
          over_time: null,
          total: 89,
        },
      },
    },
    {
      id: 384948,
      date: "2024-08-29T02:00:00+00:00",
      time: "02:00",
      timestamp: 1724896800,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Climate Pledge Arena",
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
          id: 172,
          name: "Seattle Storm W",
          logo: "https://media.api-sports.io/basketball/teams/172.png",
        },
        away: {
          id: 162,
          name: "Atlanta Dream W",
          logo: "https://media.api-sports.io/basketball/teams/162.png",
        },
      },
      scores: {
        home: {
          quarter_1: 23,
          quarter_2: 20,
          quarter_3: 16,
          quarter_4: 26,
          over_time: null,
          total: 85,
        },
        away: {
          quarter_1: 16,
          quarter_2: 24,
          quarter_3: 22,
          quarter_4: 19,
          over_time: null,
          total: 81,
        },
      },
    },
    {
      id: 415879,
      date: "2024-08-29T09:00:00+00:00",
      time: "09:00",
      timestamp: 1724922000,
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
          id: 2772,
          name: "NorthPort",
          logo: "https://media.api-sports.io/basketball/teams/2772.png",
        },
        away: {
          id: 4899,
          name: "Converge FiberXers",
          logo: "https://media.api-sports.io/basketball/teams/4899.png",
        },
      },
      scores: {
        home: {
          quarter_1: 38,
          quarter_2: 30,
          quarter_3: 32,
          quarter_4: 35,
          over_time: null,
          total: 135,
        },
        away: {
          quarter_1: 24,
          quarter_2: 26,
          quarter_3: 27,
          quarter_4: 32,
          over_time: null,
          total: 109,
        },
      },
    },
    {
      id: 399422,
      date: "2024-08-29T11:00:00+00:00",
      time: "11:00",
      timestamp: 1724929200,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Singapore Basketball Centre",
      status: {
        long: "Game Finished",
        short: "FT",
        timer: null,
      },
      league: {
        id: 410,
        name: "NBL",
        type: "League",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/410.png",
      },
      country: {
        id: 78,
        name: "Singapore",
        code: "SG",
        flag: "https://media.api-sports.io/flags/sg.svg",
      },
      teams: {
        home: {
          id: 6373,
          name: "Siglap",
          logo: "https://media.api-sports.io/basketball/teams/6373.png",
        },
        away: {
          id: 6367,
          name: "Eng Tat Hornets",
          logo: "https://media.api-sports.io/basketball/teams/6367.png",
        },
      },
      scores: {
        home: {
          quarter_1: 13,
          quarter_2: 15,
          quarter_3: 20,
          quarter_4: 22,
          over_time: null,
          total: 70,
        },
        away: {
          quarter_1: 19,
          quarter_2: 24,
          quarter_3: 22,
          quarter_4: 21,
          over_time: null,
          total: 86,
        },
      },
    },
    {
      id: 415880,
      date: "2024-08-29T11:30:00+00:00",
      time: "11:30",
      timestamp: 1724931000,
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
          id: 5648,
          name: "TNT Tropang Giga",
          logo: "https://media.api-sports.io/basketball/teams/5648.png",
        },
        away: {
          id: 2769,
          name: "Magnolia Hotshots",
          logo: "https://media.api-sports.io/basketball/teams/2769.png",
        },
      },
      scores: {
        home: {
          quarter_1: 29,
          quarter_2: 21,
          quarter_3: 22,
          quarter_4: 16,
          over_time: null,
          total: 88,
        },
        away: {
          quarter_1: 22,
          quarter_2: 27,
          quarter_3: 17,
          quarter_4: 16,
          over_time: null,
          total: 82,
        },
      },
    },
    {
      id: 399580,
      date: "2024-08-29T12:30:00+00:00",
      time: "12:30",
      timestamp: 1724934600,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Singapore Basketball Centre",
      status: {
        long: "Game Finished",
        short: "FT",
        timer: null,
      },
      league: {
        id: 410,
        name: "NBL",
        type: "League",
        season: 2024,
        logo: "https://media.api-sports.io/basketball/leagues/410.png",
      },
      country: {
        id: 78,
        name: "Singapore",
        code: "SG",
        flag: "https://media.api-sports.io/flags/sg.svg",
      },
      teams: {
        home: {
          id: 6466,
          name: "Police",
          logo: "https://media.api-sports.io/basketball/teams/6466.png",
        },
        away: {
          id: 6368,
          name: "Nanyang",
          logo: "https://media.api-sports.io/basketball/teams/6368.png",
        },
      },
      scores: {
        home: {
          quarter_1: 25,
          quarter_2: 13,
          quarter_3: 16,
          quarter_4: 22,
          over_time: null,
          total: 76,
        },
        away: {
          quarter_1: 18,
          quarter_2: 7,
          quarter_3: 11,
          quarter_4: 15,
          over_time: null,
          total: 51,
        },
      },
    },
    {
      id: 401265,
      date: "2024-08-29T12:30:00+00:00",
      time: "12:30",
      timestamp: 1724934600,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Ho Xuan Huong Gymnasium",
      status: {
        long: "Game Finished",
        short: "FT",
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
          id: 3992,
          name: "Can Tho Catfish",
          logo: "https://media.api-sports.io/basketball/teams/3992.png",
        },
        away: {
          id: 3994,
          name: "Hanoi Buffaloes",
          logo: "https://media.api-sports.io/basketball/teams/3994.png",
        },
      },
      scores: {
        home: {
          quarter_1: 16,
          quarter_2: 27,
          quarter_3: 16,
          quarter_4: 23,
          over_time: null,
          total: 82,
        },
        away: {
          quarter_1: 18,
          quarter_2: 25,
          quarter_3: 22,
          quarter_4: 24,
          over_time: null,
          total: 89,
        },
      },
    },
    {
      id: 413699,
      date: "2024-08-29T23:00:00+00:00",
      time: "23:00",
      timestamp: 1724972400,
      timezone: "UTC",
      stage: null,
      week: null,
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
          quarter_1: 22,
          quarter_2: 18,
          quarter_3: 21,
          quarter_4: 19,
          over_time: null,
          total: 80,
        },
        away: {
          quarter_1: 21,
          quarter_2: 27,
          quarter_3: 14,
          quarter_4: 19,
          over_time: null,
          total: 81,
        },
      },
    },
    {
      id: 413700,
      date: "2024-08-29T23:30:00+00:00",
      time: "23:30",
      timestamp: 1724974200,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Forum de Valencia",
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
          id: 1564,
          name: "Trotamundos",
          logo: "https://media.api-sports.io/basketball/teams/1564.png",
        },
        away: {
          id: 1562,
          name: "Marinos",
          logo: "https://media.api-sports.io/basketball/teams/1562.png",
        },
      },
      scores: {
        home: {
          quarter_1: 23,
          quarter_2: 27,
          quarter_3: 22,
          quarter_4: 19,
          over_time: null,
          total: 91,
        },
        away: {
          quarter_1: 23,
          quarter_2: 12,
          quarter_3: 16,
          quarter_4: 26,
          over_time: null,
          total: 77,
        },
      },
    },
    {
      id: 415944,
      date: "2024-08-29T23:30:00+00:00",
      time: "23:30",
      timestamp: 1724974200,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Municipal Stadium Ka",
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
          id: 3899,
          name: "Colonias Gold",
          logo: "https://media.api-sports.io/basketball/teams/3899.png",
        },
        away: {
          id: 3902,
          name: "Sol de America",
          logo: "https://media.api-sports.io/basketball/teams/3902.png",
        },
      },
      scores: {
        home: {
          quarter_1: 25,
          quarter_2: 28,
          quarter_3: 18,
          quarter_4: 26,
          over_time: null,
          total: 97,
        },
        away: {
          quarter_1: 12,
          quarter_2: 6,
          quarter_3: 15,
          quarter_4: 15,
          over_time: null,
          total: 48,
        },
      },
    },
    {
      id: 415945,
      date: "2024-08-29T23:30:00+00:00",
      time: "23:30",
      timestamp: 1724974200,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "León Coundou",
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
          id: 3900,
          name: "Dep. San Jose",
          logo: "https://media.api-sports.io/basketball/teams/3900.png",
        },
        away: {
          id: 2997,
          name: "Olimpia Kings",
          logo: "https://media.api-sports.io/basketball/teams/2997.png",
        },
      },
      scores: {
        home: {
          quarter_1: 17,
          quarter_2: 15,
          quarter_3: 23,
          quarter_4: 18,
          over_time: null,
          total: 73,
        },
        away: {
          quarter_1: 23,
          quarter_2: 17,
          quarter_3: 12,
          quarter_4: 16,
          over_time: null,
          total: 68,
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
      id: 415946,
      date: "2024-08-30T00:30:00+00:00",
      time: "00:30",
      timestamp: 1724977800,
      timezone: "UTC",
      stage: null,
      week: null,
      venue: "Luis Fernandez Arena",
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
          id: 3898,
          name: "Ciudad Nueva",
          logo: "https://media.api-sports.io/basketball/teams/3898.png",
        },
        away: {
          id: 4936,
          name: "Felix Perez Cardozo",
          logo: "https://media.api-sports.io/basketball/teams/4936.png",
        },
      },
      scores: {
        home: {
          quarter_1: 13,
          quarter_2: 10,
          quarter_3: 21,
          quarter_4: 24,
          over_time: null,
          total: 68,
        },
        away: {
          quarter_1: 19,
          quarter_2: 18,
          quarter_3: 17,
          quarter_4: 15,
          over_time: null,
          total: 69,
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
  return games
    .filter((game) => game.status.short === "NS")
    .map((game) => ({ game, odds: bet }));
}
