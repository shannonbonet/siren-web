import {
    Appointment,
    CalendlyLink,
    Case,
    Client,
    Dictionary,
    Document,
    Question,
  } from '../types';
import firebase from './clientApp';
import {objectToMap} from './helpers';

  const database = firebase.firestore();
  const clientCollection = database.collection('clients');

  export const getClient = async (clientId: string): Promise<Client> => {
    try {
        const doc = await clientCollection.doc(clientId).get();
        const client = doc.data() as Client;
        client.answers = objectToMap(client.answers);
        return client;
    } catch (e) {
        console.warn(e);
        throw e;
    }
  }

export const getAllClients = async (): Promise<Client[]> => {
    try {
        const ref = await clientCollection.get();
        return ref.docs.map(doc => doc.data() as Client);
    } catch (e) {
        console.warn(e);
        throw e;
      }
}

export const getAllQuestionsOfType = async( 
    caseType: string,
): Promise<Question[]> => {
    try{
        const ref = await database.collection(`caseTypes/${caseType}/questions`).orderBy('order').get()
        return ref.docs.map(doc => doc.data() as Question);
    } catch (e){
        console.warn(e);
          throw (e);
    }
  }


