import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";
import { QuestionType } from "../../../types";
import IntakeHome from "../../components/IntakeHome/IntakeHome";
 

export default function IntakeHomeScreen() {
  return (
    <div>
      <Layout>
        <IntakeHome/>
      </Layout>
    </div>
  );
}
