import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";
import { QuestionType } from "../../../types";
 

export default function GenQuestion() {
  const myProps = {
    caseType: QuestionType.General
  }
  return (
    <div>
      <Layout>
        <IntakeForm caseType={QuestionType.I90}/>
      </Layout>
    </div>
  );
}
