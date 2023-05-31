import { apiBase, apiHost, apiKey } from "../../../lib/apiFootball";
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const storageCountrie = localStorage.getItem("countrie");
  const storageSeasonData = localStorage.getItem("seasonData");
  const storageIdLeague = localStorage.getItem("idLeague");
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
      `${apiBase}/leagues/?season=${storageSeasonData}&country=${storageCountrie}&league=${storageIdLeague}`,
      requestOptions
    ).then((resp) => resp.json());

    res.status(200).json({ teams: response });
  } catch (error) {
    console.log("Error:", error);
  }
};
export default handler;
