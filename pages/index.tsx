import { useState, useContext } from "react";
import { AppContextCodUser } from "../context/appContext";
import styles from "./style.module.css";
import { TextInput } from "../components/TextInput";
import { Typography } from "../components/Typography";
import { Button } from "../components/Button";
import Link from "next/link";

import { apiBase, apiHost, apiKey } from "../lib/apiFootball";

export default function Home({ league }: any) {
  const [codFootBall, setCodFootBall] = useState("");
  const { codUser, setCodUser } = useContext(AppContextCodUser);
  return (
    <section className={styles.containerHome}>
      <Typography type="40" color="white">
        Bem Vindo
      </Typography>
      <TextInput
        value={codUser}
        placeholder="Digite seu Codigo"
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCodUser(e.target.value)
        }
      />
      <Typography type="12" color="white">
        ainda não tem cadastro? <span className={styles.link}>Clique aqui</span>
      </Typography>
      <Link href="./countries">
        <Button name="logar" onClick={() => {}} />
      </Link>
    </section>
  );
}
