import React from "react";

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
  };
};

function Bet({}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between"></div>
    </div>
  );
}

export default Bet;
