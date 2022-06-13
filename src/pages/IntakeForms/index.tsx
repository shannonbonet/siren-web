import { Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { CaseType, QuestionType } from "../../../types";
import FormHolder from "../../components/FormHolder/FormHolder";
import styles from "./styles.module.css"
import Layout from "../../components/Layout";
import { firestoreAutoId } from "../../firebase/helpers";
import { deleteCase, getAllCaseTypes } from "../../firebase/queries";

export default function IntakeHomeScreen() {
  const [caseForms, setCaseForms] = useState(new Map<string, any>());
  const [caseNames, setCaseNames] = useState(new Map<string, string>());

  const loadCases = async (): Promise<void> => {
    let cL: CaseType[] = await getAllCaseTypes();
    let forms= new Map<string, any>();
    let names = new Map<string, string>();
    cL.map(c => {
      let name = c.key;
      let id = firestoreAutoId();
      forms.set(id, <FormHolder staticTitle={name} id={id} connecterFunctions={{
          deleteForm: deleteForm,
          dupesExist: dupesExist,
          updateNameList: updateNameList
        }}/>);
      names.set(id, name);
    });
    setCaseForms(forms);
    setCaseNames(names);
  };

  useEffect(() => {
    loadCases();
  }, []);

  function deleteForm(id, name) {
    let cloneMap = new Map<string, {name, form}>(caseForms);
    cloneMap.delete(id);
    setCaseForms(cloneMap);
    deleteCase((name).toString());
  }


  function dupesExist(): boolean {
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
    return findDuplicates(Array.from(caseNames.values())).length != 0;
  }

  function updateNameList(id, name) {
    let newNames = new Map(caseNames);
    newNames.set(id, name);
    setCaseNames(newNames);
  }
  
  return (
    <div>
        <h1>Intake Forms</h1>
        <div className={styles.buttondiv}>
          <Button variant="contained" onClick={() => {
            let newForms = new Map(caseForms);
            let newNames = new Map(caseNames);
            let defaultName = "New Case Type";
            let id = firestoreAutoId();
            newForms.set(id, <FormHolder staticTitle={defaultName} id={id} connecterFunctions={{
              deleteForm: deleteForm,
              dupesExist: dupesExist,
              updateNameList: updateNameList
            }}/>);
            newNames.set(id, defaultName);
            setCaseForms(newForms);//You need to have 2 maps that both rely on ids, for objects and for maps.
            setCaseNames(newNames);
          }}>
             Add New Form
          </Button>
        </div>
        {caseForms.size ? Array.from(caseForms.values()) : <span>Loading...</span>}
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