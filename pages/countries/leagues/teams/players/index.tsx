import { useRouter } from "next/router";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { apiBase, apiHost, apiKey } from "../../../../../lib/apiFootball";
import styles from "./style.module.css";
import type { NextApiRequest, NextApiResponse } from "next";
import { Typography } from "../../../../../components/Typography";
import { playerFake } from "../../../../test";
import { PlayerType, StaticPlyerType } from "./_types";

const Teams = () => {
  const [teams, setTeams] = useState<PlayerType[]>();
  const [imgTeam, setImgTeam] = useState<any>("");
  const router = useRouter();
  const { countrie, idLeague, seasonData, teamID } = router.query;
  const handler = async () => {
    const storageCountrie = localStorage.getItem("countrie");
    const storageSeasonData = localStorage.getItem("seasonData");
    const storageIdLeague = localStorage.getItem("idLeague");
    const storageTeamImg = localStorage.getItem("teamImg");
    setImgTeam(storageTeamImg);
    try {
      /* const params = req.query; */
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", apiKey as string);
      myHeaders.append("x-rapidapi-host", apiHost);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        `${apiBase}/players/?team=${router.query.teamId}&season=${storageSeasonData}&league=${storageIdLeague}`,
        requestOptions
      );
      const result = await response.json();
      setTeams(result.response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div className={styles.containerTeams}>
      <picture>
        <img src={imgTeam} alt="img time" />
      </picture>
      <Typography type="24" color="white">
        Jogadores do time{" "}
        <span className={styles.nameTeam}>{router?.query?.teamName}</span>
      </Typography>
      <div className={styles.subContainerTeams}>
        {teams &&
          teams.map((item: PlayerType) => {
            return (
              <div key={item.player.id} className={styles.brasaoContainer}>
                <Typography type="20" bold="bold" orientation="center">
                  {item.player.name}
                </Typography>
                <div className={styles.containerItemTeam}>
                  <div className={styles.containerResumedInfoPlayer}>
                    <picture>
                      <img
                        alt="img jogador"
                        className={styles.playerPhoto}
                        src={item.player.photo}
                      />
                    </picture>
                    <div className={styles.detailsPlayerInfo}>
                      <span className={styles.space}>
                        <Typography type="16">
                          {item.player.firstname + " " + item.player.lastname}
                        </Typography>
                      </span>
                      <span className={styles.space}>
                        <Typography type="16">
                          Idade: {item.player.age}
                        </Typography>
                      </span>
                      <span className={styles.space}>
                        <Typography type="16">
                          Nacionalidade: {item.player.nationality}
                        </Typography>
                      </span>
                    </div>
                  </div>

                  {item?.statistics?.map((item: any, index: any) => {
                    return (
                      <div key={index} className={styles.leagueDetails}>
                        <picture>
                          <img
                            alt="img liga"
                            className={styles.leaguePhoto}
                            src={item.league.logo}
                          />
                        </picture>
                        <Typography type="16">
                          {" "}
                          {item?.league?.name} ano : {item?.league?.season}
                        </Typography>
                        teste
                        <Typography type="16">
                          Gols : {item?.goals.total}{" "}
                        </Typography>
                        <Typography type="16">
                          Vermelhos : {item.cards.red}
                        </Typography>
                        <Typography type="16">
                          Vermelhos : {item.cards.yellow}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      <button onClick={() => console.log(teams)}> aquiiii</button>
      <button onClick={() => console.log(router.query)}> rotas</button>
    </div>
  );
};

export default Teams;
