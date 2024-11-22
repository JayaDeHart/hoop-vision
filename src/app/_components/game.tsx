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
import Alert from "./alert";

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
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCloseError = () => {
    setError(null);
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
        odds: selectedTeam === "home" ? game.oddsHomeTeam : game.oddsAwayTeam,
      });
    } else {
      setError("Unable to place bet. Try betting less tokens");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  function convertMilitaryTime(time: string): string {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format. Expected format: 'HH:MM'.");
    }

    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;

    return `${adjustedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  }

  return (
    <div className="">
      <Card className="flex h-full flex-col items-center justify-between xl:h-96 xl:w-96">
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
              higherOdds={homeOdds < awayOdds}
            />
            <div className="p-2 text-sm font-normal">VS</div>
            <TeamLogo
              teamName={gameData.teams.away.name}
              teamLogo={gameData.teams.away.logo}
              odds={awayOdds}
              higherOdds={awayOdds < homeOdds}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col items-center justify-center pb-2 text-sm">
          <p>{formatDate(game.gameDate)}</p>
          <p>{convertMilitaryTime(gameData.time)}</p>
        </CardContent>

        <CardFooter className="relative z-10 flex flex-col">
          <Button onClick={() => setIsModalOpen(true)}>Place Bet</Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleClose} width="md">
        <div className="flex max-w-md flex-col items-center gap-4">
          <div className="flex justify-between gap-3">
            <div onClick={() => handleTeamSelect("home")}>
              <TeamLogo
                teamName={gameData.teams.home.name}
                teamLogo={gameData.teams.home.logo}
                odds={homeOdds}
                higherOdds={homeOdds < awayOdds}
                selected={selectedTeam === "home"}
              />
            </div>
            <div onClick={() => handleTeamSelect("away")}>
              <TeamLogo
                teamName={gameData.teams.away.name}
                teamLogo={gameData.teams.away.logo}
                odds={awayOdds}
                higherOdds={awayOdds < homeOdds}
                selected={selectedTeam === "away"}
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
          {error && <Alert message={error} onClose={handleCloseError} />}
        </div>
      </Modal>
    </div>
  );
}

export default Game;
