import Link from "next/link";
import styles from "./styles.module.css";
import { Typography } from "../../components/Typography";
import { TextInput } from "../../components/TextInput";
import { useState } from "react";
import React from "react";
import { countriesFake } from "../test";

const Countries = ({ countries }: any) => {
  const guardParamsToTeams = (countrieFlag: string) => {
    localStorage.setItem("countrieFlag", countrieFlag);
  };
  const [search] = useState(["name"]);
  const [findInList, setFindInList] = useState("");
  const getFilter = (items: any) => {
    return items.filter((item: any) => {
      return search.some((newItem: any) => {
        return (
          item[newItem]
            ?.toString()
            ?.toLowerCase()
            ?.indexOf(findInList.toLowerCase()) > -1
        );
      });
    });
  };
  return (
    <section className={styles.containerCountries}>
      <Typography type="32" color="white">
        Selecione o seu pais
      </Typography>
      <TextInput
        placeholder="Procure seu pais"
        value={findInList}
        onChangeText={(e) => setFindInList(e.target.value)}
      />
      <div className={styles.containerCarrossel}>
        {/*   {countries?.response[0]?.name &&
          getFilter(countries.response).map((item: any, index: any) => {
            return (
              <Link
                key={index}
                href={`countries/leagues/${item.name}`}
                onClick={() => guardParamsToTeams(item.flag)}
              >
                <div className={styles.subContainerCarrosel}>
                  <h6>{item.name}</h6>
                  <img src={item.flag} className={styles.imgFlag} />
                </div>
              </Link>
            );
          })} */}
        {
          /*  mock */ countriesFake?.response[0]?.name &&
            getFilter(countriesFake?.response).map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  href={`countries/leagues/${item.name}`}
                  onClick={() => {}}
                >
                  <div className={styles.subContainerCarrosel}>
                    <h6>{item.name}</h6>
                    <img src={item.flag} className={styles.imgFlag} />
                  </div>
                </Link>
              );
            })
        }
      </div>
    </section>
  );
};

export default Countries;
/* dps de testar tudo liga
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/countries");
  const json = await res.json();
  return {
    props: {
      countries: json.countries || null,
    },
  };
} */
