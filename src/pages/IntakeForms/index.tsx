import { Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { CaseType, QuestionType } from "../../../types";
import FormHolder from "../../components/FormHolder/FormHolder";
import styles from "./styles.module.css"
import Layout from "../../components/Layout";
import { firestoreAutoId } from "../../firebase/helpers";
import { getAllCaseTypes } from "../../firebase/queries";

export default function IntakeHomeScreen() {
  const [caseForms, setCaseForms] = useState([]);
  let keyList=[];
  const loadCases = async (): Promise<void> => {
    let cL: CaseType[] = await getAllCaseTypes();
    let copyArray=[];
    cL.map(c => {
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
          <Button variant="contained" onClick={() => {
            let copy = [...caseForms];
            copy.push(<FormHolder key={caseForms.length}/>);
            setCaseForms(copy);
          }}>
             Add New Form
          </Button>
        </div>
        {caseForms.length ? caseForms : <span>Loading...</span>}
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