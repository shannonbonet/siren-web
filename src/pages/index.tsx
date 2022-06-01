import Dashboard from "./dashboard";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../firebase/auth/useFirebaseAuth";

export default function Home() {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/welcome");
    }
  });

  return (
      <Dashboard/>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} 
    </Layout>
  )
}