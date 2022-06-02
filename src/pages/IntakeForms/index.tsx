import { Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { CaseType, QuestionType } from "../../../types";
import FormHolder from "../../components/FormHolder/FormHolder";
import styles from "./styles.module.css"
import Layout from "../../components/Layout";
import { firestoreAutoId } from "../../firebase/helpers";
import { getAllCaseTypes } from "../../firebase/queries";

var allCaseTypes = new Map<string, QuestionType>();
export default function IntakeHomeScreen() {
  const [caseForms, setCaseForms] = useState([]);
  let keyList=[];
  const loadCases = async (): Promise<void> => {
    let cL: CaseType[] = await getAllCaseTypes();
    allCaseTypes = new Map<string, QuestionType>();
    let copyArray=[];
    cL.map(c => {

      var id = firestoreAutoId();

      allCaseTypes.set(id, QuestionType[c.key]);
      if (!keyList.includes(c.key)) {
        copyArray.push(<FormHolder formTitle={c.key} key={caseForms.length}/>);
      }
    });
    setCaseForms(copyArray);
  };

  useEffect(() => {
    loadCases();
  }, []);
  
  return (
    <div>
        <h1>Intake Forms</h1>
        <div className={styles.buttondiv}>
          <Button variant="contained"> Add New Form </Button>
        </div>
        <FormHolder formTitle="General"></FormHolder>
        <div>
          {caseForms.length ? caseForms : <span>Loading...</span>}
        </div>
    </div>
  );
}

IntakeHomeScreen.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} 
    </Layout>
  )
}