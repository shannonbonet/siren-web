import React from "react";
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

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onPress} className={styles['App-button']} id={styles[props.buttonType]}>
      <a className={styles['App-button-text']} id={styles[props.textType]}>
        {props.text}
      </a>
    </button>
  );
};

export default Button;