import { ClientInfo } from "../../components/ClientInfo/ClientInfo";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function ClientView() {
  const router = useRouter();
  return (
    // Layout wraps this component in index.tsx
    <div>
      <Layout>
        <h1>Intake Dashboard</h1>
        <ClientInfo query={router.query} />
      </Layout>
    </div>
  );
}
