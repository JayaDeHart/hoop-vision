"use client";

import React, { useState } from "react";
import { type HomeAwayBet, type GameResponse } from "../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Image from "next/image";

type Props = {
  game: GameResponse;
  odds: HomeAwayBet;
};

function Game({ game, odds }: Props) {
  const homeTeam = game.teams.home;
  const awayTeam = game.teams.away;
  let homeOdds = null;
  let awayOdds = null;

  if (odds.bet) {
    homeOdds = odds.bet.values.find((bet) => bet.value === "Home")?.odd;
    awayOdds = odds.bet.values.find((bet) => bet.value === "Away")?.odd;
  }

  console.log("@#@@@@@/", odds);

  const [awayLogo, setAwayLogo] = useState(awayTeam.logo);
  const [homeLogo, setHomeLogo] = useState(homeTeam.logo);

  return (
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
          <div className="flex flex-col">
            <div
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <Image
                src={awayLogo}
                alt="Away team logo"
                fill
                style={{ objectFit: "cover" }}
                onError={() => setAwayLogo("/fallback_logo.jpg")}
              />
            </div>
            <div>{awayTeam.name}</div>
          </div>
          <div>At</div>
          <div className="flex flex-col">
            <div
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <Image
                src={homeLogo}
                alt="Home team logo"
                fill
                style={{ objectFit: "cover" }}
                onError={() => setHomeLogo("/fallback_logo.jpg")}
              />
            </div>

            <div>{homeTeam.name}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p>@{game.time}</p>
      </CardContent>
      <CardFooter className="relative z-10">
        {odds.bet ? (
          <div className="flex flex-col">
            <p>Home: {homeOdds}</p>
            <p>Away: {awayOdds}</p>
          </div>
        ) : (
          <p>No odds found</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default Game;
