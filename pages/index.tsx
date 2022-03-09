import Head from 'next/head'
import styles from '../styles/Home.module.css'
import firebase from '../firebase/clientApp'
import { useCollection } from "react-firebase-hooks/firestore"
import Dashboard from './dashboard';
import Layout from '../components/Layout';

export default function Home() {

  //Retrieves firestore collection called 'clients'
  const [clients, clientLoading, clientError] = useCollection(
    firebase.firestore().collection("clients"),
    {}
  );

  if (!clientLoading && clients) {
    clients.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <Layout>
      <Dashboard/>
    </Layout>
  )
}