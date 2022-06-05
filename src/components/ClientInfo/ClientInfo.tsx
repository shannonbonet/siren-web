import styles from "./ClientInfo.module.css";
import { Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import React, { useState, useEffect } from "react";
import { getAllClients, getAllCaseTypes, getClientCases, getClientCaseDocs, getClient } from "../../firebase/queries";
import { Client, CaseType, Case, Document, CaseKey } from "../../../types";
import DocumentsBox from './DocumentsBox';
import ClientActionsBox from './ClientActionsBox';

export const ClientInfo = ({ query }) => {
  const [client, setClient] = useState<Client>(null);
  const [cases, setCases] = useState<Array<CaseType>>(null);
  const [clientDocsToCase, setClientDocsToCase] = useState<Array<[Case, Document[]]>>(null);
  const [caseInfo, setCaseInfo] = useState<Array<Case>>(null);

  useEffect(() => {
    async function loadClientResponses() {
      // get the correct client 
      //REFACTOR
      //rewrite as a useeffect function -- only call once
      const correctClient = (await getAllClients()).filter(
        (c) =>
          c.answers !== undefined &&
          Object.keys(c.answers).length >= 1 &&
          c.id == query["id"]
      );
      setClient(correctClient[0]);
  
      // get cases by client's answers
      const caseNames = correctClient[0] && correctClient[0].answers 
        ? (Object.keys(correctClient[0].answers).map((key) => {
          return(CaseKey[key])
        })).filter((k) => {
          return(k)
        })
        : [];
      
      // get documents of each case
      const caseTypes = (await getAllCaseTypes()).filter(
        (c) => caseNames.includes(c.key)
      );
      setCases(caseTypes);
      // get client cases
      const openClientCases = (correctClient && correctClient[0] ? (await getClientCases(correctClient[0].id)) : null);
      await setCaseInfo(openClientCases);
      var docToCaseArr = new Array();
      for (const c in openClientCases) {
        const d = await getClientCaseDocs(correctClient[0].id, openClientCases[c].id);
        docToCaseArr.push([openClientCases[c], d]);
      }
      await setClientDocsToCase(docToCaseArr);
    }
    loadClientResponses();
  });

  return (
    <>
      <h2>
        {client && client.answers && client.answers.general
          ? client?.answers?.general?.Name
          : query["fullName"]}
      </h2>
      <div className={styles.grid}>
        <OverviewBox client={client} />
        <div>
          {/* move documents box and client actions box into different files */}
          <DocumentsBox cases={cases} clientDocsToCase={clientDocsToCase}/>
          <ClientActionsBox client={client} cases={cases} caseInfo={caseInfo}/>
        </div>
      </div>
    </>
  );
};

// RENDER BOXES

const OverviewBox = ({ client }) => {
  const [tabValue, setTabValue] = useState("overview");
  const caseQuestionAnswers =
    client && client.answers && client.answers.general ? client.answers : null;
  return (
    <div className={`${styles.outline} ${styles.overview}`}>
      <TabContext value={tabValue}>
        <TabList variant="scrollable" onChange={(event, newValue) => setTabValue(newValue)}>
          <Tab disableRipple label="overview" value="overview" />
          {client && client.answers
            ? Object.keys(client.answers).map((key) =>
                key != "general" ? ( // right now, I am not including general (cuz there is an "overview" tab), but we could use this code for every answer set
                  <Tab disableRipple label={key.replace(/[A-Z]/g, " $&").trim()} value={key} />
                ) : null
              )
            : null}
        </TabList>
        <br />
        <div>
          {/* render basic info (client.general)*/}
          <TabPanel value="overview" className={styles["no-padding"]}>
            <div className={styles.flex}>
              <h3 className={styles.category}>Basic Info</h3>
              <div>
                {client && client.answers && client.answers.general
                  ? Object.keys(client.answers.general).map((key) =>(
                        <div key={key}>
                          <p>
                            <b>
                              {key.charAt(0).toUpperCase() +
                                key.replace(/[A-Z]/g, " $&").trim().slice(1)}
                            </b>
                            <br />
                            {client.answers.general[key]}
                          </p>
                        </div>
                      )
                    )
                  : null}
              </div>
            </div>
          </TabPanel>
          {/* rest of cases' answers get mapped to respective headers*/}
          {client && client.answers
            ? Object.keys(client.answers).map((caseType) =>
                caseType != "general" ? ( // right now, I am not including general (cuz there is an "overview" tab), but we could use this code for every answer set
                  <TabPanel value={caseType} className={styles["no-padding"]}>
                    <div className={styles.flex}>
                      <h3 className={styles.category}>{caseType.charAt(0).toUpperCase() +
                                caseType.replace(/[A-Z]/g, " $&").trim().slice(1)}</h3>
                      <div>
                      {client.answers[caseType]
                           ? Object.keys(client.answers[caseType]).map((e) => (
                            <div key={e}>
                              <p>
                                <b>
                                  {e.charAt(0).toUpperCase() +
                                    e.replace(/[A-Z]/g, " $&").trim().slice(1)}
                                </b>
                                <br />
                                {client.answers[caseType][e]}
                              </p>
                            </div>
                             ))
                           : null}
                      </div>
                    </div>
                  </TabPanel>
                ) : null
              )
            : null}
        </div>
      </TabContext>
    </div>
  );
};