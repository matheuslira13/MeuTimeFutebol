import styles from "./styles.module.css";
import { TypographyProps } from "./_types";

export const Typography = ({
  children,
  type,
  color = "black",
}: TypographyProps) => {
  let fontSize = {
    "48": { style: "48px" },
    "40": { style: "40px" },
    "32": { style: "32px" },
    "28": { style: "28px" },
    "24": { style: "24px" },
    "20": { style: "20px" },
    "16": { style: "16px" },
    "12": { style: "12px" },
    "8": { style: "8px" },
  }[type];
  let selectColor = {
    blue: { style: styles.blue },
    yellow: { style: styles.yellow },
    green: { style: styles.green },
    red: { style: styles.red },
    black: { style: styles.black },
    white: { style: styles.white },
  }[color];

  return (
    <p className={selectColor.style} style={{ fontSize: `${fontSize.style}` }}>
      {children}
    </p>
  );
};
