import { Button } from "@mui/material";
import FormHolder from "../../components/FormHolder/FormHolder";
import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";
<<<<<<< HEAD
import { QuestionType } from "../../../types";
 
=======
import styles from "./styles.module.css";
>>>>>>> d198d97e684f95ca4bb22d4c3e67bd154bf7875b

export default function GenQuestion() {
  const myProps = {
    caseType: QuestionType.General
  }
  return (
    <div>
<<<<<<< HEAD
      <Layout>
        <IntakeForm caseType={QuestionType.Daca}/>
      </Layout>
=======
        <h1>Intake Forms</h1>
        <div className={styles.buttondiv}>
          <Button variant="contained"> Add New Form </Button>
        </div>
        <FormHolder formTitle="General"></FormHolder>
        {/* <IntakeForm /> */}
>>>>>>> d198d97e684f95ca4bb22d4c3e67bd154bf7875b
    </div>
  );
}
