import Link from 'next/link'
import { ClientInfo } from '../../components/ClientInfo/ClientInfo'
import Layout from '../../components/Layout'

export default function IntakeDashboard() {
    return (
        // Layout wraps this component in index.tsx
        <div> 
            <h1>Intake Dashboard</h1>
            <ClientInfo />
        </div>
    )
}