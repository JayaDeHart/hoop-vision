//games
export type GameWithOdds = {
  game: GameResponse;
  odds: HomeAwayBet;
};

export type GamesApiResponse = {
  get: string;
  parameters: {
    date: string;
  };
  errors: string[];
  results: number;
  response: GameResponse[];
};

export type GameResponse = {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  stage: string | null;
  week: string | null;
  venue: string | null;
  status: Status;
  league: League;
  country: Country;
  teams: Teams;
  scores: Scores;
};

type Status = {
  long: string;
  short: string;
  timer: string | null;
};

type League = {
  id: number;
  name: string;
  type: string;
  season: number;
  logo: string;
};

type Country = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

type Teams = {
  home: TeamDetails;
  away: TeamDetails;
};

type TeamDetails = {
  id: number;
  name: string;
  logo: string;
};

type Scores = {
  home: ScoreDetails;
  away: ScoreDetails;
};

type ScoreDetails = {
  quarter_1: number | null;
  quarter_2: number | null;
  quarter_3: number | null;
  quarter_4: number | null;
  over_time: number | null;
  total: number | null;
};

//bets
type Bet = {
  value: string;
  odd: string;
};

export type HomeAwayBet = {
  game: number;
  bookmaker: string;
  bet: {
    id: number;
    name: string;
    values: Bet[];
  } | null;
};

export type DBBet = {
  id: string;
  userId: string;
  gameId: string;
  amount: number;
  chosenTeam: string;
  result: string | null;
  payout: number | null;
  odds: number;
};

export type Winner = {
  winner: string;
  position: string | null;
};
