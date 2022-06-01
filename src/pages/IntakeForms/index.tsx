import { Button } from "@mui/material";
import FormHolder from "../../components/FormHolder/FormHolder";
import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";
import { QuestionType } from "../../../types";
import styles from "./styles.module.css";

export default function GenQuestion() {
  const myProps = {
    caseType: QuestionType.General
  }
  return (
    <div>
        <h1>Intake Forms</h1>
        <div className={styles.buttondiv}>
          <Button variant="contained"> Add New Form </Button>
        </div>
        <FormHolder formTitle="General"></FormHolder>
        {/* <IntakeForm caseType={QuestionType.Daca}/> */} 
    </div>
  );
}
