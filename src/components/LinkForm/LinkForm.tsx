import React from "react";
import styles from "./LinkForm.module.css";

export const LinkForm = () => {
  return (
    <div className={styles["link-form"]}>
      <p className={styles["link-text"]}>Link to </p>
      <select name="casetype" id={styles["case-type"]}>
        <option value="DACA Renewal">DACA Renewal</option>
        <option value="Initial DACA">Initial DACA</option>
        <option value="Citizenship">Citizenship</option>
        <option value="Green card">Green card</option>
        <option value="Family-based petition">Family-based petition</option>
        <option value="Adjustment of status">Adjustment of status</option>
        <option value="U-VISA/VAWA">U-VISA/VAWA</option>
        <option value="FOIA/FBI">FOIA/FBI</option>
        <option value="Refugee and asylum">Refugee and asylum</option>
        <option value="Deportation defense">Deportation defense</option>
        <option value="Special juvenile immigrant status">
          Special juvenile immigrant status
        </option>
        <option value="Parole in place">Parole in place</option>
      </select>
    </div>
  );
};
