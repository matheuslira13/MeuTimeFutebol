import styles from "./styles.module.css";
import { TextInputProps } from "./_types";
import { Typography } from "../Typography";
import { useState } from "react";

export const TextInput = ({
  onChangeText,
  value,
  placeholder,
  hint,
  onkeyDonw,
}: TextInputProps) => {
  const [error, setError] = useState(hint);
  let legal = hint;
  const show = () => {
    legal = false;
    console.log(hint);
  };
  return (
    <>
      <input
        value={value}
        onChange={onChangeText}
        onKeyDown={onkeyDonw}
        className={styles.containerTextInput}
        placeholder={placeholder}
      />
      {hint && (
        <Typography type="12" color="red">
          digite uma key valida
        </Typography>
      )}
    </>
  );
};
