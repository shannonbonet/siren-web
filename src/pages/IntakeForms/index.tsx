import { Button } from "@mui/material";
import { ReactElement } from "react";
import FormHolder from "../../components/FormHolder/FormHolder";
import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";
import styles from "./styles.module.css";

export default function IntakeForms() {
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

IntakeForms.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} 
    </Layout>
  )
}