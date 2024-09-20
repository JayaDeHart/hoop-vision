"use client";

import Image from "next/image";
import { useState } from "react";
import { GiConvergenceTarget } from "react-icons/gi";

interface TeamLogoProps {
  teamName: string;
  teamLogo: string;
  target?: {
    use: boolean;
    result: string | null;
  };
}

const TeamLogo = ({ teamName, teamLogo, target }: TeamLogoProps) => {
  const [logo, setLogo] = useState(teamLogo);

  const colorMap = new Map([
    ["win", "text-green-500"],
    ["loss", "text-red-500"],
    ["pending", "text-gray-500"],
    [null, "text-gray-500"],
  ]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="relative rounded-full border-2 border-gray-300 bg-white shadow-md"
        style={{
          width: "120px",
          height: "120px",
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
        <GiConvergenceTarget
          className={`absolute opacity-30 ${colorMap.get(target.result)}`}
          size={200}
        />
      )}
      <div className="mt-2 text-center">{teamName}</div>
    </div>
  );
};

export default TeamLogo;
