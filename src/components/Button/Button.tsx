import React, { MouseEvent } from "react";
import styles from "../Button/Button.module.css";


export enum ButtonType {
  "button-pruss",
  "button-clear",
}

export enum ButtonTextType {
  "button-text-white",
  "button-text-jet",
}

interface ButtonProps {
  text: string;
  buttonType: string;
  textType: string;
  onPress: () => void;

}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType,
  textType,
  onPress,
}) => {
  return (
    <button onClick={onPress} className={styles['App-button']} id={styles[buttonType]}>
      <p className={styles['App-button-text']} id={styles[textType]}>
        {text}
      </p>
    </button>
  );
};

export default Button;