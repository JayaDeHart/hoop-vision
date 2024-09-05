export type GamesApiResponse = {
  get: string;
  parameters: {
    date: string;
  };
  errors: string[];
  results: number;
  response: GameResponse[];
};

type GameResponse = {
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
  quarter_1: number;
  quarter_2: number;
  quarter_3: number;
  quarter_4: number;
  over_time: number | null;
  total: number;
};
