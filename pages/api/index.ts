import axios from "axios";
import { apiBase, apiHost } from "../../lib/apiFootball";

export default async function getCountries(apiKey: string) {
  try {
    const myHeaders = {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    };

    const response = await axios.get(`${apiBase}/countries`, {
      headers: myHeaders,
    });

    return { countries: response.data };
  } catch (error) {
    return { countries: error };
  }
}
