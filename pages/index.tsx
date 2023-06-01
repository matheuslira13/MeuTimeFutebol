//client side
import { useState, useContext } from "react";
import { AppContextCodUser } from "../context/appContext";
import styles from "./style.module.css";
import { TextInput } from "../components/TextInput";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import getCountries from "./api";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { codUser, setCodUser } = useContext(AppContextCodUser);
  const router = useRouter();

  const callAPi = async () => {
    setLoading(true);
    try {
      const response = await getCountries(codUser);
      const data = await response;
      if (
        data?.countries?.errors?.token?.toLowerCase().includes("erro") ||
        data?.countries?.errors?.requests?.toLowerCase().includes("limit")
      ) {
        setError(true);
      } else {
        const arrayCountries = data?.countries?.response;
        const arrayCountriesString = JSON.stringify(arrayCountries);
        localStorage.setItem("arrayCountries", arrayCountriesString);
        localStorage.setItem("apiKey", codUser);
        Cookies.set("apiKey", codUser, { expires: 1, sameSite: "Strict" });
        router.push("/countries");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.containerHome}>
      <Typography type="40" color="white">
        Bem Vindo
      </Typography>
      <TextInput
        value={codUser}
        placeholder="Digite seu Codigo"
        onkeyDonw={() => setError(false)}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCodUser(e.target.value)
        }
        hint={error}
      />
      <Typography type="12" color="white">
        ainda não tem cadastro?
        <span className={styles.link}>
          <a target="_blank" href="https://dashboard.api-football.com/register">
            Clique aqui
          </a>
        </span>
      </Typography>

      <Button name="logar" onClick={() => callAPi()} />

      {loading && (
        <div className={styles.loading}>
          <ReactLoading
            type="cylon"
            color="#FFF"
            height="200px"
            width="200px"
          />
        </div>
      )}
    </section>
  );
}
