import { ReactElement } from "react";
import { QuestionType } from "../../../types";
import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";

export default function IntakeForms() {
  return (
    <div>
        <IntakeForm caseType={QuestionType.Daca}/>
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