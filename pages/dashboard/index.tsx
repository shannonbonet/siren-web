import { ClientInfo } from '../../components/ClientInfo/ClientInfo'

export default function IntakeDashboard() {
    return (
        // Layout wraps this component in index.tsx
        <div> 
            <h1>Intake Dashboard</h1>
            <ClientInfo />
        </div>
    )
}
