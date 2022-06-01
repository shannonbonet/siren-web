import { getAllCaseTypes } from "../../firebase/queries";
import { useEffect } from "react";
import { firestoreAutoId } from "../../firebase/helpers";
import styles from "./IntakeHome.module.css";
import { CaseType, QuestionType } from "../../../types";

 
var caseMap = new Map<string, QuestionType>();
const componentList = [];


const IntakeHome = () => {
  const loadCases = async (): Promise<void> => {
    let cL: CaseType[] = await getAllCaseTypes();
    caseMap = new Map<string, QuestionType>();
    console.log("CL", cL);
    cL.map(c => {
      var id = firestoreAutoId()
      console.log("key", c.key);
      console.log("Type", QuestionType[c.key]);
      caseMap.set(id, QuestionType[c.key]);
    });
    console.log("caseMap", caseMap);
  };

  function getCaseName(key) {
    switch(key) {
      case QuestionType.General:
        return "General Questions";
      case QuestionType.Daca: 
        return "Daca Renewal Questions";
      case QuestionType.Adjustment:
        return "Adjustment Of Status Questions";
      default:
        return "I90 Questions";
    }
  }

  const makeComponent = (id, key) => {
    componentList.push({id, key});
    return (
      <div key={firestoreAutoId()} className={styles.tab}>
          <div className={styles.title}>
              {getCaseName(key)}
          </div>
      </div>
    )
  }


  useEffect(() => {
    loadCases();
  }, []);
  
  console.log("componentList again", componentList);
  console.log("caseMap again", caseMap);
  return (
      <div className={styles.page}>
          <div className={styles.overlay}>
              Intake Forms
          </div>
        {caseMap.forEach((id, key) => makeComponent(id, key))}
      </div>
  );
}

export default IntakeHome;
