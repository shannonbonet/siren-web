import Layout from '../../components/Layout'
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import { Button } from '@mui/material';

export default function Settings() {
    const { signOut } = useAuth();
    return (
        <Layout>
            <h1>Settings</h1>
            <Button variant="outlined" onClick={signOut} >Sign Out</Button>
        </Layout>
    )
}