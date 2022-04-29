import { valueToPercent } from '@mui/base';
import { typography } from '@mui/system';
import { EventEmitter } from 'stream';
import {
    Appointment,
    CalendlyLink,
    Case,
    Client,
    Dictionary,
    Document,
    Question,
    SirenUser
  } from '../../types';
import firebase from './clientApp';
import {objectToMap} from './helpers';

  const database = firebase.firestore();
  const clientCollection = database.collection('clients');
  const sirenUserCollection = database.collection('sirenUsers');

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

export const getClientResponsesOfType = async(
  client: Client, 
  caseType: string
): Promise<Map<string, any>> => {
  try{
    const answers: Map<string, Map<string, any>> = client.answers;
    if (answers && answers[caseType] !== undefined){
      return answers[caseType];
    } else {
      return null
    }
  } catch (e){
    console.warn(e);
    throw(e);
  }
}

export const getIdentifiers = async(
  clientId: string
): Promise<Array<Object>> => {
  try{
    let caseIds = new Array<Object>();
    const cases = await database.collection(`clients/${clientId}/cases`).get();
    const cliCases = cases.docs.map(c => c.data());
    await cliCases.map(c => caseIds.push({caseType: c.type, identifier: c.identifier}))
    return caseIds;
  } catch (e){
    console.warn(e);
    throw(e);
  } 
}

export const getSirenUser = async (uid: string ) => {
  try {
    const doc = await sirenUserCollection.doc(uid).get();
    const sirenUser = doc.data() as SirenUser;
    return sirenUser;
  } catch (e) {
    console.warn(e);
    throw e;
  }
}

export const setSirenUser = async (sirenUser: SirenUser) => {
  try {
    await sirenUserCollection.doc(sirenUser.uid).set(sirenUser);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const getAllApprovedSirenUsers = async (): Promise<SirenUser[]> => {
  try {
    const ref = await sirenUserCollection.where('isApproved', '==', true).get();
    return ref.docs.map(doc => doc.data() as SirenUser);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

export const getAllPendingSirenUsers = async (): Promise<SirenUser[]> => {
  try {
    const ref = await sirenUserCollection.where('isApproved', '==', false).get();
    return ref.docs.map(doc => doc.data() as SirenUser);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};


