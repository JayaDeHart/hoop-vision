"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { SiRubygems } from "react-icons/si";

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
  higherOdds: boolean;
}

const TeamLogo = ({
  teamName,
  teamLogo,
  target,
  odds,
  higherOdds,
}: TeamLogoProps) => {
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
          <div
            className="rounded-md p-2"
            style={{
              background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${higherOdds ? "rgba(0,204,255,1)" : "rgba(255,0,164,1)"} 100%)`,
              opacity: 0.5,
            }}
          >
            <TooltipTrigger className="font-light"> {odds}</TooltipTrigger>
          </div>
          <TooltipContent side="top" className="p-4 text-sm opacity-100">
            <p className="flex items-center gap-1">
              Bet <SiRubygems className="inline align-middle" />
              100 to win <SiRubygems className="inline align-middle" />
              {(odds * 100 - 100).toFixed(0)}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TeamLogo;

{
  /* <div
  class="rounded-x20 absolute inset-0 bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center transition-opacity duration-300"
  style="background: linear-gradient(90deg, var(--blue-x20) 0%, var(--blue-x20) 33.33%, var(--purple-x20) 66.67%, var(--purple-x20) 100%); opacity: 0;"
></div>; */
}
