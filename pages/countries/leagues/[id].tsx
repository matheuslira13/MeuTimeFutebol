import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { apiBase, apiHost } from "../../../lib/apiFootball";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography } from "../../../components/Typography";
import ReactLoading from "react-loading";
import axios from "axios";
import { LeagueTypes } from "./_types";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

const Leagues = ({ season }: { season: number[] }) => {
  const { apiKey } = parseCookies();
  useEffect(() => {
    const storageCountrieFlag = localStorage?.getItem("countrieFlag");
    setStorageCountrieFlag(storageCountrieFlag as string);
  }, []);
  const [storageCountrieFlag, setStorageCountrieFlag] = useState("");
  const [countrieName, setCountrieName] = useState<string>("");
  const [seasonData, setSeasonData] = useState<string>("");
  const [filtredLeague, setFiltredLeague] = useState<Array<LeagueTypes>>();
  const { query } = useRouter();

  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  async function getTeams(item: string) {
    setLoading(true);
    setStart(true);
    try {
      const params = query.id;
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", apiKey as string);
      myHeaders.append("x-rapidapi-host", apiHost);
      setCountrieName(query.id as string);
      setSeasonData(item);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      await fetch(
        `${apiBase}/leagues/?country=${params}&season=${item}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setFiltredLeague(data.response);
        })
        .finally(() => {
          setLoading(false), setStart(false);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  }
  const guardParamsToTeams = (
    countrieName: string,
    seasonData: string,
    idLeague: string,
    leagueName: string
  ) => {
    localStorage.setItem("countrieName", countrieName);
    localStorage.setItem("seasonData", seasonData);
    Cookies.set("seasonData", seasonData, { expires: 1, sameSite: "Strict" });
    Cookies.set("countrieName", countrieName, {
      expires: 1,
      sameSite: "Strict",
    });
    Cookies.set("idLeague", idLeague, { expires: 1, sameSite: "Strict" });
    localStorage.setItem("idLeague", idLeague);
    localStorage.setItem("leagueName", leagueName);
  };

  return (
    <section className={styles.containerLeagues}>
      <div className={styles.containerResumeInformation}>
        <div className={styles.containerResumeInformationCountrie}>
          <Typography color="white" type="20">
            Pais selecionado <span className={styles.bold}>{query.id}</span>
          </Typography>
          <img className={styles.flag} src={storageCountrieFlag} />
        </div>
      </div>
      <Typography color="white" type="28">
        Selecione a temporada
      </Typography>
      <select
        id="seasons"
        className={styles.selecContainer}
        onChange={(event) => getTeams(event.target.value)}
      >
        {season.map((item: number, index: number) => {
          return (
            <option key={index} className={styles.containerLeagueItem}>
              {item}
            </option>
          );
        })}
      </select>
      <button onClick={() => console.log("aquiii", apiKey)}>teste</button>
      <div className={styles.subContainerLeague}>
        {filtredLeague &&
          filtredLeague.map((item: LeagueTypes) => {
            return (
              <Link
                key={item.league.id}
                onClick={() =>
                  guardParamsToTeams(
                    countrieName,
                    seasonData,
                    item.league.id.toString(),
                    item.league.name
                  )
                }
                href={{
                  pathname: `/countries/leagues/teams/${countrieName}`,
                  query: {
                    countrieName,
                    seasonData,
                    idLeague: item.league.id,
                  },
                }}
              >
                {loading ? (
                  <div className={styles.loading}>
                    <ReactLoading
                      type="cylon"
                      color="#FFF"
                      height="200px"
                      width="200px"
                    />
                  </div>
                ) : (
                  <div className={styles.containerLeagueItem}>
                    {item.league.name}
                    <img src={item.league.logo} />
                  </div>
                )}
              </Link>
            );
          })}
        {start && (
          <ReactLoading
            type="cylon"
            color="#FFF"
            height="200px"
            width="200px"
          />
        )}
      </div>
    </section>
  );
};
export default Leagues;

export async function getServerSideProps(context: any) {
  const { apiKey } = parseCookies(context);

  const resSeasons = await axios.get(`http://localhost:3000/api/seasons/`, {
    headers: { "x-api-key": apiKey },
  });
  console.log("pegasus fantasy");
  return {
    props: {
      season: resSeasons.data.season.response,
    },
  };
}
