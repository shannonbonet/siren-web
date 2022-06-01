import { Button } from "@mui/material";
import FormHolder from "../../components/FormHolder/FormHolder";
import styles from "./styles.module.css";

export default function GenQuestion() {
  return (
    <div>
        <h1>Intake Forms</h1>
        <div className={styles.buttondiv}>
          <Button variant="contained"> Add New Form </Button>
        </div>
        <FormHolder formTitle="General"></FormHolder>
        {/* <IntakeForm /> */}
    </div>
  );
}
