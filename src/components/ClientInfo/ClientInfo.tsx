import styles from "./ClientInfo.module.css";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation, AiOutlineSave } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { HiOutlinePencil } from 'react-icons/hi';
import {
  Button,
  Tab,
  TextField
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { IconButton } from '@material-ui/core';
import React, { useState } from "react";
import { getAllClients, getAllCaseTypes, getClientCases, getClientCaseDocs, updateInfo, getClient} from "../../firebase/queries";
import { Client, CaseType, Case, Document } from "../../../types";

export const ClientInfo = ({ query }) => {
  const [client, setClient] = useState<Client>(null);
  const [cases, setCases] = useState<Array<CaseType>>(null);
  const [clientDocsToCase, setClientDocsToCase] = useState<Array<[Case, Document[]]>>(null);
  async function loadClientResponses() {
    // get the correct client
    const correctClient = (await getAllClients()).filter(
      (c) =>
        c.answers !== undefined &&
        Object.keys(c.answers).length >= 1 &&
        c.id == query["id"]
    );
    setClient(correctClient[0]);

    ///// TEST DATA /////
    const testCasesOpen = ["DACA renewal", "Citizenship"];
    
    // get documents of each case
    const caseTypes = (await getAllCaseTypes()).filter(
      (c) =>
        testCasesOpen.includes(c.key)
    );
    setCases(caseTypes);
    // get client cases
    const openClientCases = (correctClient && correctClient[0] ? (await getClientCases(correctClient[0].id)) : null);
    // get case docs
    const caseDocs = (openClientCases ? await openClientCases.map((c) => 
      (getClientCaseDocs(correctClient[0].id, c.id))
    ) : null );
    var docToCaseArr = new Array();
    for (const c in openClientCases) {
      const d = await getClientCaseDocs(correctClient[0].id, openClientCases[c].id);
      docToCaseArr.push([openClientCases[c], d]);
    }
    setClientDocsToCase(docToCaseArr);
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
          <ClientActionsBox cases={cases}/>
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


  const [editingForm, setEditingForm] = useState<boolean>(false);
  const [edited, setEdited] = useState<Map<string, string>>(new Map());
  const [saving, setSaving] = useState<boolean>(false);


  const resetForm = () => {
    setEditingForm(false);
    setEdited(new Map<string, string>());
  }

  const saveEdits = (): void => {
    console.log(edited);
    resetForm();
  }

  //TODO: add functionality to buttons
  const renderButtons = () => {  
    if (editingForm){
      return(
        <div className={styles['saveCancelContainer']}>
          <IconButton onClick={() => setEditingForm(false)}>
            <GrClose/>
            Cancel
          </IconButton>
          <IconButton className={styles['saveIcon']} onClick={() => saveEdits()}>
            <HiOutlinePencil/>
            Save
          </IconButton>
        </div>
      )
    } else {
      return(
        <div className={styles['editContainer']}>
          <IconButton onClick={() => setEditingForm(true)}>
            <HiOutlinePencil/>
            Edit
          </IconButton>
        </div>
      )
    }
  };




  return (
    <div className={`${styles.outline} ${styles.overview}`}>
      <TabContext value={tabValue}>
        <TabList onChange={(event, newValue) => setTabValue(newValue)}>
          <Tab disableRipple label="overview" value="overview" />
          <Tab disableRipple label="immigration" value="immigration" />
        </TabList>
        <br />
        <div>
          <TabPanel value="overview" className={styles["no-padding"]}>
            {renderButtons(client)}
            <div className={styles.flex}>
              <h3 className={styles.category}>Basic Info</h3> {/* align buttons with this header*/}
              <div>
                {client && client.answers && client.answers.general
                  ? Object.keys(client.answers.general).map((key) =>
                      key == "Name" ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Covid") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Law") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Court") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Arrival") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Alien") ? null : (
                        <p>
                          <b>
                            {key.charAt(0).toUpperCase() +
                              key.replace(/[A-Z]/g, " $&").trim().slice(1)}
                          </b>
                          <br />
                          {editingForm ? 
                            <input type='text' defaultValue={client.answers.general[key]} className={styles['editableField']} onChange={(e) => {
                                setEdited(edited.set(key, e.target.value));     
                            }}/>
                          :client.answers.general[key]}
                        </p>
                      )
                    )
                  : null}
              </div>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.category}>COVID-19</h3>
              <div>
                {client && client.answers && client.answers.general
                  ? Object.keys(client.answers.general).map((key) =>
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Covid") ? (
                        <p>
                          <b>
                            {key.charAt(0).toUpperCase() +
                              key.replace(/[A-Z]/g, " $&").trim().slice(1)}
                          </b>
                          <br />
                          {client.answers.general[key]}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="immigration" className={styles["no-padding"]}>
            <div className={styles.flex}>
              <h3 className={styles.category}>Background</h3>
              <div>
                {client && client.answers && client.answers.general
                  ? Object.keys(client.answers.general).map((key) =>
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Alien") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Court") ||
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Arrival") ? (
                        <p>
                          <b>
                            {key.charAt(0).toUpperCase() +
                              key.replace(/[A-Z]/g, " $&").trim().slice(1)}
                          </b>
                          <br />
                        </p>
                      ) : null
                    )
                  : null}
              </div>
            </div>
            <div className={styles.flex}>
              <h3 className={styles.category}>Criminal Record</h3>
              <div>
                {client && client.answers && client.answers.general
                  ? Object.keys(client.answers.general).map((key) =>
                      (
                        key.charAt(0).toUpperCase() +
                        key.replace(/[A-Z]/g, " $&").trim().slice(1)
                      ).includes("Law") ? (
                        <p>
                          <b>
                            {key.charAt(0).toUpperCase() +
                              key.replace(/[A-Z]/g, " $&").trim().slice(1)}
                          </b>
                          <br />
                          {client.answers.general[key]}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
            </div>
          </TabPanel>
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
    if (cas) {
      return (
        cas[0]['documentList'].map((doc) => (
          displayDoc(docs, doc)
          ))
      );
    } else {
      return (<p>Documents are loading...</p>);
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

const ClientActionsBox = ({cases}) => {
  const [clientActionsState, setClientActionsState] = useState("select");
  const [selectCaseValue, setSelectCaseValue] = useState("");
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
  };
  const handleAccept = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectCaseValue) {
      setClientActionsState("confirm approve");
    }
  };
  const caseSelectedComp = ():React.Component => {
    if (selectCaseValue) {
      return(<p>Case Selected: {selectCaseValue}</p>);
    } else {
      return(<p>Select a case from the dropdown above.</p>);
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
              onClick={() => setClientActionsState("approve")}
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
              onClick={() => setClientActionsState("select")}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setClientActionsState("reject")}
            >
              Confirm
            </Button>
          </div>
        </div>
      );
    case "approve":
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <div className={styles.center}>
            <div className={styles.successNotif}>
              <StatusIcon completed={true} /> Success!
              {caseSelectedComp()}
            </div>
          </div>
          <p className={styles.center}>
            This client has been notified of their approval.
          </p>
          <div className={styles.buttons}>
          <Button
              variant="contained"
              onClick={() => setClientActionsState("select")}
            >
              Continue
            </Button>
            </div>
        </div>
      );
      case "reject":
        return (
          <div className={`${styles.outline} ${styles.padding}`}>
            <div className={styles.center}>
              <div className={styles.successNotif}>
                <StatusIcon completed={true} /> Success!
                {caseSelectedComp()}
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
      // console.log(cases);
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <div className={styles.alignHorizontal}>
            <h3>Client Actions</h3> 
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
          {caseSelectedComp()}
          {selectCaseValue ? <div className={styles.buttons}>
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
          </div> : null}
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
