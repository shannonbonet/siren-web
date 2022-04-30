import { valueToPercent } from "@mui/base";
import { typography } from "@mui/system";
import { EventEmitter } from "stream";
import {
  Appointment,
  CalendlyLink,
  Case,
  Client,
  Dictionary,
  Document,
  Question,
} from "../../types";
import firebase from "./clientApp";
import { objectToAnswerOptionsMap, objectToMap, mapToObject } from "./helpers";

const database = firebase.firestore();
const clientCollection = database.collection("clients");

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
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const ref = await clientCollection.get();
    return ref.docs.map((doc) => doc.data() as Client);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const getAllQuestionsOfType = async (
  caseType: string
): Promise<Question[]> => {
  try {
    const ref = await database
      .collection(`caseTypes/${caseType}/questions`)
      .orderBy("order")
      .get();
      const questions = ref.docs.map(doc => doc.data() as Question);
      questions.map(
        question => (question.displayText = objectToMap(question.displayText)),
      );
      questions.map(
        question => (question.description = objectToMap(question.description)),
      );
      questions.map(
        question => (question.example = objectToMap(question.example)),
      );
      questions.map(
        question =>
          (question.answerOptions = objectToAnswerOptionsMap(
            question.answerOptions,
          )),
      );
      console.log(questions);
      return questions;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const getClientResponsesOfType = async (
  client: Client,
  caseType: string
): Promise<Map<string, any>> => {
  try {
    const answers: Map<string, Map<string, any>> = client.answers;
    if (answers && answers[caseType] !== undefined) {
      return answers[caseType];
    } else {
      return null;
    }
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const getIdentifiers = async (
  clientId: string
): Promise<Array<Object>> => {
  try {
    let caseIds = new Array<Object>();
    const cases = await database.collection(`clients/${clientId}/cases`).get();
    const cliCases = cases.docs.map((c) => c.data());
    await cliCases.map((c) =>
      caseIds.push({ caseType: c.type, identifier: c.identifier })
    );
    return caseIds;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};


export const updateInfo = async(
  client: Client, 
  caseType: string,
  field: string, // field to be updated on client response
  newInfo: string,
) => {
  try{
    const copy = {...client} as Dictionary;
    copy.answers = mapToObject(client.answers);
    copy.answers[caseType][field] = newInfo;
    await clientCollection.doc(copy.id).set(copy);
  } catch(e){
    console.warn(e)
    throw(e)
  }
};



