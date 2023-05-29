import styles from "./styles.module.css";
import { TextInputProps } from "./_types";

export const TextInput = ({
  onChangeText,
  value,
  placeholder,
}: TextInputProps) => {
  return (
    <input
      value={value}
      onChange={onChangeText}
      className={styles.containerTextInput}
      placeholder={placeholder}
    />
  );
};
