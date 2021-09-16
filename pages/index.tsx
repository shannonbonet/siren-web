import Head from 'next/head'
import styles from '../styles/Home.module.css'
import firebase from '../firebase/clientApp'
import { useCollection } from "react-firebase-hooks/firestore";


export default function Home() {

  //Retrieves firestore collection called 'clients'
  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes"),
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SIREN Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SIREN Admin
        </h1>
      </main>
    </div>
  )
}