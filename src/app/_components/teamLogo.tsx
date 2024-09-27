"use client";

import Image from "next/image";
import { useState } from "react";
import { GiConvergenceTarget } from "react-icons/gi";
import { FaCaretDown } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface TeamLogoProps {
  teamName: string;
  teamLogo: string;
  odds: number;
  target?: {
    use: boolean;
    result: string | null;
  };
}

const TeamLogo = ({ teamName, teamLogo, target, odds }: TeamLogoProps) => {
  const [logo, setLogo] = useState(teamLogo);

  const colorMap = new Map([
    ["win", "text-green-500"],
    ["loss", "text-red-500"],
    ["pending", "text-gray-500"],
    [null, "text-gray-500"],
  ]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 xl:max-h-48 xl:max-w-56">
      <div
        className="relative rounded-full border-2 border-gray-300 bg-white shadow-md sm:h-[80px] sm:w-[80px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px] xl:h-[100px] xl:w-[100px]"
        style={{
          overflow: "hidden",
        }}
      >
        <Image
          src={logo}
          alt={`${teamName} logo`}
          fill
          style={{ objectFit: "cover" }}
          onError={() => setLogo("/fallback_logo.jpg")}
          className="rounded-full"
        />
      </div>
      {target?.use && (
        <FaCaretDown
          className={`absolute opacity-50 ${colorMap.get(target.result)} bottom-[130px]`}
          size={100}
        />
      )}
      <div className="text-md mt-2 text-center">
        {" "}
        {teamName.length > 18 ? teamName.substring(0, 18) + "..." : teamName}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="font-light">{odds}</TooltipTrigger>
          <TooltipContent side="top" className="p-4 text-sm">
            <p>Bet $100 to win ${(odds * 100 - 100).toFixed(0)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TeamLogo;
