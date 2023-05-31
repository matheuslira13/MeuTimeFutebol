import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiBase, apiHost, apiKey } from "../../../../lib/apiFootball";
import styles from "./style.module.css";
import type { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { Typography } from "../../../../components/Typography";
import ReactLoading from "react-loading";

const Teams = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<any>("");
  const [storageCountrieName, setStorageCountrieName] = useState<any>("");
  const [storageSeasonData, setStorageSeasonData] = useState<any>("");
  const [storageIdLeague, setStorageIdLeague] = useState<any>("");
  const [storageCountrieFlag, setStorageCountrieFlag] = useState<any>("");
  const [storageleagueName, setStorageleagueName] = useState<any>("");
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const storageCountrieName = localStorage.getItem("countrieName");
    const storageSeasonData = localStorage.getItem("seasonData");
    const storageIdLeague = localStorage.getItem("idLeague");
    const storageCountrieFlag = localStorage?.getItem("countrieFlag");
    const storageleagueName = localStorage?.getItem("leagueName");
    setStorageCountrieName(storageCountrieName);
    setStorageSeasonData(storageSeasonData);
    setStorageIdLeague(storageIdLeague);
    setStorageCountrieFlag(storageCountrieFlag);
    setStorageleagueName(storageleagueName);
    handler();
  }, [loading]);

  const { countrie, idLeague, seasonData } = router.query;
  const guardParamsToTeams = (
    teamName: string,
    teamId: string,
    teamImg: string
  ) => {
    localStorage.setItem("teamName", teamName);
    localStorage.setItem("teamId", teamId);
    localStorage.setItem("teamImg", teamImg);
  };
  const handler = async () => {
    try {
      /* const params = req.query; */
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", apiKey);
      myHeaders.append("x-rapidapi-host", apiHost);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      await fetch(
        `${apiBase}/teams/?season=${storageSeasonData}&country=${storageCountrieName}&league=${storageIdLeague}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setTeams(data.response);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.containerTeams}>
      <div className={styles.containerResumeInformationCountrie}>
        <img className={styles.flag} src={storageCountrieFlag} />
        <Typography type="20">Times que jogaram a </Typography>
        <Typography type="16">
          <span className={styles.bold}> {storageleagueName} </span> Ano{" "}
          <span className={styles.bold}> {storageSeasonData}</span>
        </Typography>
      </div>

      <div className={styles.subContainerTeams}>
        {!loading ? (
          teams.map((item: any, index: any) => {
            return (
              <Link
                key={index}
                onClick={() =>
                  guardParamsToTeams(
                    item.team.name,
                    item.team.id,
                    item.team.logo
                  )
                }
                href={{
                  pathname: `/countries/leagues/teams/players`,
                  query: {
                    teamId: item.team.id,
                    teamName: item.team.name,
                  },
                }}
              >
                <div className={styles.containerItemTeam}>
                  <p> {item.team.name}</p>
                  <img src={item.team.logo} />
                </div>
              </Link>
            );
          })
        ) : (
          <ReactLoading
            type="cylon"
            color="#FFF"
            height="200px"
            width="200px"
          />
        )}
      </div>
    </div>
  );
};

export default Teams;
