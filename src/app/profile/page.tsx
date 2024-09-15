import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import TeamLogo from "../_components/teamLogo";
import Bet from "../_components/bet";

type Props = {};

async function Profile({}: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const userBets = await api.user.getUserBets();
  const wins = userBets.filter((bet) => bet.bet.result === "win");

  return (
    <div className="flex flex-col gap-4">
      <h3>Profile: {session.user.name}</h3>
      <div className="grid grid-cols-2">
        <div>Tokens: {session.user.tokens}</div>
        <div>Bets: {userBets.length}</div>
        <div>Wins: {wins.length}</div>
      </div>
      <h3>Bets</h3>
      <div className="grid grid-cols-2">
        {userBets.map((bet) => (
          <Bet bet={bet.bet} game={bet.game} key={bet.game.id} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
