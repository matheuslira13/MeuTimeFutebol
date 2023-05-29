import { apiBase, apiHost, apiKey } from "../../../lib/apiFootball";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", apiKey);
    myHeaders.append("x-rapidapi-host", apiHost);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `${apiBase}/leagues/?country=${params.name}`,
      requestOptions
    ).then((resp) => resp.json());
    res.status(200).json({ countries: response });
  } catch (error) {
    console.log("Error:", error);
  }
}
