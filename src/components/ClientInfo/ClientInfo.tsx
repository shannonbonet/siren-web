import styles from "./ClientInfo.module.css";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation } from "react-icons/ai";
import {
  Button,
  Tab,
  TextField,
  CircularProgress
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import React, { useState } from "react";
import { getAllClients, getAllCaseTypes, getClientCases, getClientCaseDocs, updateStatus } from "../../firebase/queries";
import { Client, CaseType, Case, Document, CaseKey } from "/types";
import { CaseStatus } from "../../../types";

export const ClientInfo = ({ query }) => {
  const [client, setClient] = useState<Client>(null);
  const [cases, setCases] = useState<Array<CaseType>>(null);
  const [clientDocsToCase, setClientDocsToCase] = useState<Array<[Case, Document[]]>>(null);
  const [caseInfo, setCaseInfo] = useState<Array<Case>>(null);

  async function loadClientResponses() {
    // get the correct client
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

  return (
    <>
      <h2>
        {client && client.answers && client.answers.general
          ? client.answers.general.Name
          : query["fullName"]}
      </h2>
      <div className={styles.grid}>
        <OverviewBox client={client} />
        <div>
          <DocumentsBox cases={cases} clientDocsToCase={clientDocsToCase}/>
          <ClientActionsBox client={client} cases={cases} caseInfo={caseInfo}/>
        </div>
      </div>
    </>
  );
};

const caseOptions = new Map<string, string>([
  ["I90", "I-90"],
  ["adjustmentOfStatus", "Adjustment of status"],
  ["citizenship", "Citizenship"],
  ["dacaRenewal", "DACA renewal"],
]);

// RENDER BOXES

const OverviewBox = ({ client }) => {
  const [tabValue, setTabValue] = useState("overview");
  const caseQuestionAnswers =
    client && client.answers && client.answers.general ? client.answers : null;
  return (
    <div className={`${styles.outline} ${styles.overview}`}>
      <TabContext value={tabValue}>
        <TabList onChange={(event, newValue) => setTabValue(newValue)}>
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

const DocumentsBox = ({ cases, clientDocsToCase }) => {
  const [selectCaseValue, setSelectCaseValue] = useState('');
  // This function is triggered when the select changes
  const handleSelectCaseValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCaseValue(event.target.value);
  };
  // function to render document list
  const displayDocList = (): React.Component => {
    const cas = cases.filter((element) => {
      return element.key == selectCaseValue
    });
    const docsToCase = (clientDocsToCase ? clientDocsToCase.filter((element) => {
      return caseOptions.get(element[0].type) == selectCaseValue
    }) : null);
    const docs = (docsToCase && docsToCase[0] ? docsToCase[0][1] : null)
    if (!docs) {
      return (<p>Documents are loading...</p>);
    } else {
      return (
        cas[0]['documentList'].map((doc) => (
          displayDoc(docs, doc)
        ))
      );
    } 
  };
  // returns document link component to render
  const displayDoc = (docs, doc): React.Component => {
    let url = '';
    const docExists = (docs ? ((docs.filter((element) => {
      const found = element.type == doc;
      if (found) {
        url = element.url;
      }
      return found;
    })).length > 0) : false);
    if (docExists) {
      return (<div className={`${styles.alignHorizontal} ${styles.docEntry}`} key={doc}>
       <div className={styles.docAlign}> <StatusIcon completed={true} /></div>
        <p>
          <a href={url} rel="noopener noreferrer" target="_blank">
            {doc}
          </a>
          <FiExternalLink className={styles.external} />
        </p> 
      </div>)
    } else {
      return (<div className={`${styles.alignHorizontal} ${styles.docEntry}`} key={doc}>
        <div className={styles.docAlign}> <StatusIcon completed={false} /></div>
        <p>
          {doc}
        </p> 
      </div>)
    }
  }
  // render
  return (
    <div className={`${styles.outline} ${styles.padding}`}>
      <div className={styles.alignHorizontal}>
        <h3 className={styles.flex}>Documents</h3>
        {cases ? 
        <select onChange={handleSelectCaseValue} className={styles.flex}>
          <option selected disabled>
            Select Case
          </option>
          {cases.map((key, value) => 
            <option value={key.key}>{key.key}</option>
          )}
        </select> : null}
      </div>
        { selectCaseValue ? displayDocList() : null }
    </div>
  );
};

const ClientActionsBox = ({client, cases, caseInfo}) => {
  const [clientActionsState, setClientActionsState] = useState("select");
  const [selectCaseValue, setSelectCaseValue] = useState("");
  const [selectedCaseInfo, setSelectedCaseInfo] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  // TODO: implement referral link
  // const [referralLink, setReferralLink] = useState('');

  const handleReject = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    if (selectCaseValue) {
      setClientActionsState("confirm reject");
    }
  };
  // This function is triggered when the select changes
  const handleSelectCaseValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCaseValue(event.target.value);
    const caseFromType = getCaseFromType(event.target.value);
    setSelectedCaseInfo(caseFromType);
    console.log(caseFromType);
  };
  const handleAccept = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectCaseValue) {
      setClientActionsState("confirm approve");
    }
  };
  // async function to update backend
  const handleConfirm = async(status: string) => {
    setUpdatingStatus(true);
    const caseId = selectedCaseInfo.id;
    console.log(selectedCaseInfo);
    await updateStatus(client.id, caseId, status, selectedCaseInfo);
    setSelectCaseValue(null);
    setUpdatingStatus(false);
  };
  const getCaseFromType = (type: string): Case => {
    const filteredCase = caseInfo.filter((c) => {
      return (CaseKey[c.type] === type);
    });
    return filteredCase[0];
  };
  // renders correct message for selected case
  const caseSelectedComp = ():React.Component => {
    if (updatingStatus) {
      return(
        <div>
          <CircularProgress />
          <p>Processing action...</p>
        </div>
      );
    } else if (!caseInfo) {
      return(<p>Loading cases...</p>)
    } else {
      if (selectCaseValue) {
        return(<p>Case Selected: {selectCaseValue}</p>);
      } else {
        return(<p>Select a case from the dropdown above.</p>);
      }
    }
  }
  switch (clientActionsState) {
    case "confirm approve":
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <h3>Client Actions</h3> 
          {caseSelectedComp()}
          <p>
            Are you sure you want to approve this client's case for a consultation?
          </p>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              className={styles.button}
              onClick={() => setClientActionsState("select")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleConfirm(CaseStatus.SchedApt);
                setClientActionsState("approve");
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      );
    case "confirm reject":
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <h3>Client Actions</h3> 
          {caseSelectedComp()}
          <p>
            Are you sure you want to reject this client's case?
          </p>
          <div className={styles.buttons}>
            <Button
              variant="outlined"
              className={styles.button}
            onClick={() => {
              setClientActionsState("select");
            }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleConfirm(CaseStatus.Resubmit);
                setClientActionsState("reject");
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      );
    case "approve":
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <h3>Client Actions</h3> 
          {updatingStatus ? 
            <div>
              <CircularProgress />
              <p>Processing action...</p>
            </div> 
          : 
            <div>
              <div className={styles.center}>
                <div className={styles.successNotif}>
                  <StatusIcon completed={true} /> Success!
                </div>
              </div>
              <p className={styles.center}>
                This client has been notified of their approval.
              </p>
              <div className={styles.buttons}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectCaseValue('');
                    setClientActionsState("select");
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          }
        </div>
      );
      case "reject":
        return (
          <div className={`${styles.outline} ${styles.padding}`}>
            <h3>Client Actions</h3> 
              {updatingStatus ? 
                <div>
                  <CircularProgress />
                  <p>Processing action...</p>
                </div> 
              :
              <div>
                <div className={styles.center}>
                  <div className={styles.successNotif}>
                    <StatusIcon completed={true} /> Success!
                  </div>
                </div>
                <p className={styles.center}>
                  This client has been notified of their rejection.
                </p>
                {/* TODO: implement referral link
                <p>
                  Would you like to send a referral link?
                </p>
                <Button
                    variant="outlined"
                    onClick={() => setClientActionsState("select")}
                    className={styles.button}
                  >
                    No
                  </Button>
                <Button
                    variant="contained"
                    onClick={() => setClientActionsState("referral")}
                  >
                    Send Referral Link
                  </Button> */}
                  <div className={styles.buttons}>
                  <Button
                  variant="contained"
                  onClick={() => setClientActionsState("select")}
                  className={styles.buttons}
                  >
                  Continue
                </Button>
                </div>
              </div>
              }
          </div>
        );
        // TODO: implement referral link
      case "referral":
        return (
          <div className={`${styles.outline} ${styles.padding}`}>
            {caseSelectedComp()}
            <p className={styles.center}>
              Enter referral link:
            </p>
            <TextField
                label="Referral Link"
                variant="outlined"
                onChange={(e) => setReferralLink(e.target.value)}
              />
            <Button
                variant="outlined"
                onClick={() => setClientActionsState("select")}
              >
                Don't send Referral Link
              </Button>
            <Button
                variant="contained"
                onClick={() => setClientActionsState("sent referral")}
              >
                Send Referral Link
              </Button>
          </div>
        );
    default:
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <div className={styles.alignHorizontal}>
            <h3>Client Actions</h3> 
            {caseInfo ? 
              <select onChange={handleSelectCaseValue} className={styles.flex}>
                <option selected disabled>
                  Select Case
                </option>
                {cases.map((key, value) => 
                  <option value={key.key}>{key.key}</option>
                )}
              </select> : null}
          </div>
          {caseSelectedComp()}
          {selectCaseValue ? 
            ((selectedCaseInfo.status === CaseStatus.SchedApt || 
             selectedCaseInfo.status === CaseStatus.Resubmit) ?
              (selectedCaseInfo.status === CaseStatus.Resubmit 
              ?
                <div>
                  This case has already been rejected.
                </div>
              :
                <div>
                  This case has already been accepted.
                </div>
              )
            :
              <div className={styles.buttons}>
                <Button 
                  variant="outlined" 
                  onClick={() => handleReject()} 
                  className={styles.button}>
                  Reject
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleAccept()}
                >
                  Accept for Consultation
                </Button>
              </div> )
          : null}
        </div>
      );
  }
};

const StatusIcon = ({ completed }) => {
  if (completed) {
    return (
      <span className={`${styles.status} ${styles.blue}`}>
        <FiCheck style={{ stroke: "white" }} />
      </span>
    );
  }
  return (
    <span className={`${styles.status} ${styles.red}`}>
      <AiOutlineExclamation style={{ fill: "white" }} />
    </span>
  );
};
