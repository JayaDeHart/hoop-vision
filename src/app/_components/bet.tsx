import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { type GameResponse } from "../types";
import TeamLogo from "./teamLogo";

type Props = {
  bet: {
    id: string;
    userId: string;
    gameId: string;
    amount: number;
    chosenTeam: string;
    result: string | null;
    payout: number | null;
  };
  game: {
    id: string;
    teamA: string;
    teamB: string;
    oddsTeamA: number;
    oddsTeamB: number;
    gameDate: Date;
    status: string;
    winner: string;
    gameData: GameResponse;
  };
};

function Bet({ bet, game }: Props) {
  const homeTeam = game.gameData.teams.home;
  const awayTeam = game.gameData.teams.away;

  const payout =
    bet.chosenTeam === game.teamA
      ? bet.amount * game.oddsTeamA
      : bet.amount * game.oddsTeamB;

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle className="flex grid-cols-3 gap-3">
          <div
            className={`${
              bet.chosenTeam === "home" ? "border-2 border-green-500" : ""
            } p-4`}
          >
            <TeamLogo teamName={homeTeam.name} teamLogo={homeTeam.logo} />
          </div>
          <div>At</div>
          <div
            className={`${
              bet.chosenTeam === "away" ? "border-2 border-green-500" : ""
            } p-4`}
          >
            <TeamLogo teamName={awayTeam.name} teamLogo={awayTeam.logo} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <p>Status: {bet.result}</p>
        <p>Payout: {payout}</p>
      </CardContent>
    </Card>
  );
}

export default Bet;
