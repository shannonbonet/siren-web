import ClientInfo from "../../components/ClientInfo/ClientInfo";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../../components/Layout";

export default function ClientView() {
  const router = useRouter();
  return (
    // Layout wraps this component in index.tsx
    <div>
        <h1>Intake Dashboard</h1>
        <ClientInfo query={router.query} />
    </div>
  );
}

ClientView.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} 
    </Layout>
  )
}
