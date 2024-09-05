import { GamesApiResponse } from "~/app/types";

export async function getTodaysGames(): Promise<GamesApiResponse> {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api-basketball.p.rapidapi.com/games?date=${today}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ec1dd97c84msh31ae883df33e45ap1b4de7jsnf66a22ff8a58",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch games data");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Could not fetch games");
  }
}
