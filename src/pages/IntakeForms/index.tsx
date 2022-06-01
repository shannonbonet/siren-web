import { ReactElement } from "react";
import IntakeForm from "../../components/IntakeForm/IntakeForm";
import Layout from "../../components/Layout";

export default function IntakeForms() {
  return (
    <div>
        <IntakeForm />
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