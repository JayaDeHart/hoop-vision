import { SiRubygems } from "react-icons/si";
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

  const WinText = () => {
    return (
      <div className="flex flex-col items-center text-xl">
        <div className="font-bold text-green-500">Hit</div>
        <div className="flex items-center gap-2 text-lg text-green-300">
          + {bet.payout} <SiRubygems />
        </div>
      </div>
    );
  };

  const LossText = () => {
    return (
      <div className="flex flex-col items-center text-xl">
        <div className="font-bold text-red-500">Miss</div>
        <div className="flex items-center gap-2 text-lg text-red-300">
          - {bet.amount} <SiRubygems />
        </div>
      </div>
    );
  };

  const PendingText = () => {
    return <div className="text-xl text-gray-500">Ongoing</div>;
  };

  const payoutTextMap = new Map([
    ["win", <WinText key="win" />],
    ["loss", <LossText key="loss" />],
    ["pending", <PendingText key="pending" />],
    [null, <PendingText key="pending" />],
  ]);

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle className="flex items-baseline gap-3">
          <div
            className={`${
              bet.chosenTeam === "home" ? "border-2 border-green-500" : ""
            } p-4`}
          >
            <TeamLogo teamName={homeTeam.name} teamLogo={homeTeam.logo} />
          </div>
          <div className="text-2xl font-bold">@</div>
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
        {payoutTextMap.get(bet.result)}
      </CardContent>
    </Card>
  );
}

export default Bet;
