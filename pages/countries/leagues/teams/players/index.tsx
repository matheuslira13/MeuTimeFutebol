import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiBase, apiHost, apiKey } from "../../../../../lib/apiFootball";
import styles from "./style.module.css";
import type { NextApiRequest, NextApiResponse } from "next";
import { Typography } from "../../../../../components/Typography";

const Teams = () => {
  const [teams, setTeams] = useState<any>("");
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
      myHeaders.append("x-rapidapi-key", apiKey);
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
      <img src={imgTeam} />
      <Typography type="24" color="white">
        Jogadores do time{" "}
        <span className={styles.nameTeam}>{router?.query?.teamName}</span>
        <div className={styles.teste}>
          <h4>Nome do jogadoe bacana</h4>
          <img
            className={styles.testeImg}
            src={
              "https://www.imagensempng.com.br/wp-content/uploads/2021/07/Jogador-Png-1024x1024.png"
            }
          />
        </div>
      </Typography>
      <div className={styles.subContainerTeams}>
        {teams &&
          teams.map((item: any, index: any) => {
            return (
              <div key={index} className={styles.brasaoContainer}>
                <Typography type="20" bold="bold" orientation="center">
                  {item.player.name}
                </Typography>
                <div className={styles.containerItemTeam}>
                  <div className={styles.containerResumedInfoPlayer}>
                    <img
                      className={styles.playerPhoto}
                      src={item.player.photo}
                    />
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
                        <img
                          className={styles.leaguePhoto}
                          src={item.league.logo}
                        />
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

/* export const getStaticProps = async () => {
  const resp = await fetch("http:localhost:3000/api/teams");
  const data = await resp.json();
  return {
    props: {
      teams: data,
    },
  };
}; */
