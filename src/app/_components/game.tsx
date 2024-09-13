"use client";

import React, { useState } from "react";
import { type HomeAwayBet, type GameResponse } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Modal from "./modal";
import { Input } from "~/components/ui/input";
import TeamLogo from "./teamLogo";
import { useSession } from "next-auth/react";

type Props = {
  game: GameResponse;
  odds: HomeAwayBet;
};

function Game({ game, odds }: Props) {
  const session = useSession();
  const tokens = session.data?.user.tokens ?? 0;
  const homeTeam = game.teams.home;
  const awayTeam = game.teams.away;
  let homeOdds = null;
  let awayOdds = null;

  if (odds.bet) {
    homeOdds = odds.bet.values.find((bet) => bet.value === "Home")?.odd;
    awayOdds = odds.bet.values.find((bet) => bet.value === "Away")?.odd;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<"home" | "away" | null>(
    null,
  );

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTeamSelect = (team: "home" | "away") => {
    setSelectedTeam(team === selectedTeam ? null : team);
  };

  return (
    <div>
      <Card className="flex flex-col items-center">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <span>{game.league.name}</span>
            <div
              className="relative h-[50px] w-[50px] rounded-full border-b-2"
              style={{
                backgroundImage: `url(${game.league.logo})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <CardTitle className="flex grid-cols-3 gap-3">
            <TeamLogo teamName={homeTeam.name} teamLogo={homeTeam.logo} />
            <div>At</div>
            <TeamLogo teamName={awayTeam.name} teamLogo={awayTeam.logo} />
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p>@{game.time}</p>
        </CardContent>
        <CardFooter className="relative z-10 flex flex-col">
          {odds.bet ? (
            <div className="flex flex-col">
              <p>Home: {homeOdds}</p>
              <p>Away: {awayOdds}</p>
            </div>
          ) : (
            <p>No odds found</p>
          )}
          <button onClick={() => setIsModalOpen(true)}>Place Bet</button>
        </CardFooter>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleClose} width="md">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div
              className={`cursor-pointer p-4 text-center ${
                selectedTeam === "home"
                  ? "shadow-[0_0_0_4px_rgba(34,197,94,1)]"
                  : ""
              }`}
              onClick={() => handleTeamSelect("home")}
            >
              <TeamLogo teamName={homeTeam.name} teamLogo={homeTeam.logo} />
              <div>{homeOdds}</div>
            </div>
            <div
              className={`cursor-pointer p-4 text-center ${
                selectedTeam === "away"
                  ? "shadow-[0_0_0_4px_rgba(34,197,94,1)]"
                  : ""
              }`}
              onClick={() => handleTeamSelect("away")}
            >
              <TeamLogo teamName={awayTeam.name} teamLogo={awayTeam.logo} />
              <div>{awayOdds}</div>
            </div>
          </div>
          <Input type="number" placeholder={`Available tokens: ${tokens}`} />
        </div>
      </Modal>
    </div>
  );
}

export default Game;
