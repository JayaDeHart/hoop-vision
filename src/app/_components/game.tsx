"use client";

import { useState } from "react";
import { type GameResponse } from "../types";
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
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

type Props = {
  game: {
    gameData: GameResponse;
    id: string;
    homeTeam: string;
    awayTeam: string;
    oddsHomeTeam: number;
    oddsAwayTeam: number;
    gameDate: Date;
    status: string;
    winner: string;
  };
};

function Game({ game }: Props) {
  const session = useSession();
  const tokens = session.data?.user.tokens ?? 0;
  const homeOdds = game.oddsHomeTeam;
  const awayOdds = game.oddsAwayTeam;

  const gameData = game.gameData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<"home" | "away" | null>(
    null,
  );
  const [amount, setAmount] = useState<number | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTeamSelect = (team: "home" | "away") => {
    console.log(game);
    setSelectedTeam(team === selectedTeam ? null : team);
  };

  const placeBet = api.bets.placeBet.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setIsModalOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handlePlaceBet = async () => {
    if (selectedTeam && amount && amount < tokens) {
      placeBet.mutate({
        amount: amount,
        game: String(game.id),
        team: selectedTeam,
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <div className="">
      <Card className="flex flex-col items-center justify-between xl:h-96 xl:w-96">
        <CardHeader className="p-2">
          <div className="flex items-center justify-center gap-2">
            <span>{gameData.league.name}</span>
            <div
              className="relative h-[50px] w-[50px] rounded-full border-b-2"
              style={{
                backgroundImage: `url(${gameData.league.logo})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <CardTitle className="flex items-baseline gap-3">
            <TeamLogo
              teamName={gameData.teams.home.name}
              teamLogo={gameData.teams.home.logo}
              odds={homeOdds}
            />
            <div className="text-2xl font-bold">@</div>
            <TeamLogo
              teamName={gameData.teams.away.name}
              teamLogo={gameData.teams.away.logo}
              odds={awayOdds}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 pb-2">
          <p>@{gameData.time}</p>
        </CardContent>
        <CardFooter className="relative z-10 flex flex-col">
          <Button onClick={() => setIsModalOpen(true)}>Place Bet</Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleClose} width="md">
        <div className="flex max-w-md flex-col items-center gap-4">
          <div className="flex justify-between">
            <div
              className={`cursor-pointer p-4 text-center ${
                selectedTeam === "home"
                  ? "shadow-[0_0_0_4px_rgba(34,197,94,1)]"
                  : ""
              }`}
              onClick={() => handleTeamSelect("home")}
            >
              <TeamLogo
                teamName={gameData.teams.home.name}
                teamLogo={gameData.teams.home.logo}
                odds={homeOdds}
              />
            </div>
            <div
              className={`cursor-pointer p-4 text-center ${
                selectedTeam === "away"
                  ? "shadow-[0_0_0_4px_rgba(34,197,94,1)]"
                  : ""
              }`}
              onClick={() => handleTeamSelect("away")}
            >
              <TeamLogo
                teamName={gameData.teams.away.name}
                teamLogo={gameData.teams.away.logo}
                odds={awayOdds}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              type="text"
              pattern="[0-9]*"
              placeholder={`Available tokens: ${tokens}`}
              onChange={handleAmountChange}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
            <Button
              onClick={handlePlaceBet}
              disabled={placeBet.isPending}
              className="max-w-md text-center"
            >
              Place Bet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Game;
