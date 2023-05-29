import styles from "./style.module.css";

const Leagues = ({ league, season }: any) => {
  return (
    <section className={styles.containerLeagues}>
      <h1>Teste</h1>
      <div className={styles.subContainerLeague}>
        {league.map((item: any, index: any) => {
          return (
            <div key={index} className={styles.containerLeagueItem}>
              {item.league.name}
              <img src={item.league.logo} />
            </div>
          );
        })}
      </div>
      <button onClick={() => console.log(season)}>aquiii</button>
    </section>
  );
};
export default Leagues;

export async function getServerSideProps(context: any) {
  const resSeasons = await fetch(`http://localhost:3000/api/seasons/`);
  const jsonSeasons = await resSeasons.json();
  const res = await fetch(
    `http://localhost:3000/api/leagues/${context.params.id}`
  );
  const json = await res.json();
  return {
    props: {
      league: json.countries.response,
      season: jsonSeasons.countries.response,
    },
  };
}
