import { ButtonProps } from "./_types";
import style from "./style.module.css";

export const Button = ({ name, onClick }: ButtonProps) => {
  return (
    <button className={style.btn} onClick={onClick}>
      {name}
    </button>
  );
};
