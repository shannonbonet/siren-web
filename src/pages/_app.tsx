import "../styles/globals.css";
import { AuthUserProvider } from "../firebase/auth/useFirebaseAuth";
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactNode, ReactElement } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page) 

  return (
    <AuthUserProvider>
        {getLayout(<Component {...pageProps} />)} 
    </AuthUserProvider>
  );
};

export default MyApp;
