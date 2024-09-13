import Image from "next/image";
import { useState } from "react";

interface TeamLogoProps {
  teamName: string;
  teamLogo: string;
}

const TeamLogo = ({ teamName, teamLogo }: TeamLogoProps) => {
  const [logo, setLogo] = useState(teamLogo);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
        }}
      >
        <Image
          src={logo}
          alt={`${teamName} logo`}
          fill
          style={{ objectFit: "cover" }}
          onError={() => setLogo("/fallback_logo.jpg")}
        />
      </div>
      <div className="text-center">{teamName}</div>
    </div>
  );
};

export default TeamLogo;
