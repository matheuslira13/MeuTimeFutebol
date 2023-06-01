import Link from "next/link";
import styles from "./styles.module.css";
import { Typography } from "../../components/Typography";
import { TextInput } from "../../components/TextInput";
import { useState, useEffect } from "react";
import React from "react";
import { CountriesType } from "./_types";
//{ season }: { season: number[] }
const Countries = ({ countries }: { countries: CountriesType[] }) => {
  const guardParamsToTeams = (countrieFlag: string) => {
    localStorage.setItem("countrieFlag", countrieFlag);
  };

  const [search] = useState(["name"]);
  const [findInList, setFindInList] = useState("");
  const [countriesArray, setCountriesArray] = useState<Array<any>>();

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedArrayStringCountries = localStorage.getItem("arrayCountries");
      const storedCountries = JSON.parse(storedArrayStringCountries as string);
      setCountriesArray(storedCountries);
    }
  }, []);

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
        {countriesArray &&
          getFilter(countriesArray).map(
            (item: CountriesType, index: number) => {
              return (
                <Link
                  key={index}
                  onClick={() => guardParamsToTeams(item.flag)}
                  href={`countries/leagues/${item.name}`}
                >
                  <div className={styles.subContainerCarrosel}>
                    <h6>{item.name}</h6>
                    <img src={item.flag} className={styles.imgFlag} />
                  </div>
                </Link>
              );
            }
          )}
      </div>
    </section>
  );
};

export default Countries;
