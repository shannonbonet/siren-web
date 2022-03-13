import { Navbar } from './Navbar/Navbar';
import styles from './Layout.module.css'
import Head from "next/head";
import { IntakeFormOverlay } from './IntakeFormOverlay/IntakeFormOverlay';

export default function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Head>
        <title>SIREN Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <div className={styles.main}>
        {children}  
      </div>
    </div>
  )
}