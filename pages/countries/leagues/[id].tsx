import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { apiBase, apiHost, apiKey } from "../../../lib/apiFootball";
import { useRouter } from "next/router";
import Link from "next/link";
import { Typography } from "../../../components/Typography";
import ReactLoading from "react-loading";

const Leagues = ({ season }: any) => {
  useEffect(() => {
    const storageCountrieFlag = localStorage?.getItem("countrieFlag");
    setStorageCountrieFlag(storageCountrieFlag as string);
  }, []);
  const [storageCountrieFlag, setStorageCountrieFlag] = useState("");
  const [countrieName, setCountrieName] = useState<string>("");
  const [seasonData, setSeasonData] = useState<string>("");
  const [filtredLeague, setFiltredLeague] = useState<any>([]);
  const { query } = useRouter();

  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  async function handler(item: string) {
    setLoading(true);
    setStart(true);
    try {
      const params = query.id;
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", apiKey);
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
      <select id="seasons">
        {season.map((item: any, index: any) => {
          return (
            <option
              key={index}
              onClick={() => handler(item)}
              className={styles.containerLeagueItem}
            >
              {item}
            </option>
          );
        })}
      </select>
      <div className={styles.subContainerLeague}>
        {filtredLeague &&
          filtredLeague.map((item: any, index: any) => {
            return (
              <Link
                key={index}
                onClick={() =>
                  guardParamsToTeams(
                    countrieName,
                    seasonData,
                    item.league.id,
                    item.league.name
                  )
                }
                href={{
                  pathname: `/countries/leagues/teams`,
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

export async function getServerSideProps() {
  const resSeasons = await fetch(`http://localhost:3000/api/seasons/`);
  const jsonSeasons = await resSeasons.json();

  return {
    props: {
      season: jsonSeasons.countries.response,
    },
  };
}
