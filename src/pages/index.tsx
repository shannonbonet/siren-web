import Dashboard from './dashboard';
import Layout from '../components/Layout';
import { useAuth } from '../firebase/auth/useFirebaseAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/welcome')
    }
  }, [authUser, loading])
  return (  
    <Layout>
      <Dashboard/>
    </Layout>
  )
}
