// pagina api next
import axios from "axios";
import { apiBase, apiHost } from "../../../lib/apiFootball";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function getSeasons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = req.headers["x-api-key"];

  try {
    const myHeaders = {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    };

    const response = await axios.get(`${apiBase}/leagues/seasons`, {
      headers: myHeaders,
    });

    res.status(200).json({ season: response.data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
