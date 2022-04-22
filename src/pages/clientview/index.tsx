import { ClientInfo } from '../../components/ClientInfo/ClientInfo';
import Layout from "../../components/Layout";

export default function ClientView() {
    return (
        // Layout wraps this component in index.tsx
        <div> 
            <Layout>
                <h1>Intake Dashboard</h1>
                <ClientInfo/>
            </Layout>
        </div>
    )
}
