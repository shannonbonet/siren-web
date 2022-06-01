import "../styles/globals.css";
import { AuthUserProvider } from "../firebase/auth/useFirebaseAuth";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthUserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserProvider>
  );
};

export default MyApp;
