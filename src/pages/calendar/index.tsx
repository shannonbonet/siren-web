import { ReactElement } from "react";
import Layout from "../../components/Layout";

export default function Calendar() {
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
}

Calendar.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} 
    </Layout>
  )
}
