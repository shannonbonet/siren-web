import styles from "./ClientInfo.module.css";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation } from "react-icons/ai";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Tab
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { useState } from "react";
import { getAllClients, getAllCaseTypes, getClientCases, getClientCaseDocs } from "../../firebase/queries";
import { Client, CaseType, Case, Document } from "/types";

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
          <ClientActionsBox />
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
            <div className={styles.flex}>
              <h3 className={styles.category}>Basic Info</h3>
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
                          {client.answers.general[key]}
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
                          {client.answers.general[key]}
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

const ClientActionsBox = () => {
  const [clientActionsState, setClientActionsState] = useState(0);
  const [approveState, setApproveState] = useState("");
  const [rejectState, setRejectState] = useState("");
  const [tabValue, setTabValue] = useState("approve");
  const [selectCaseValue, setSelectCaseValue] = useState("");
  // TODO: edit this after Greg's branched is merged
  //  - take all the cases of the client & turn them into array for answerTypeOptions
  const [answerTypeOptions, setAnswerTypeOptions] = useState([]);
  // test:
  const answerTypeOptionsTest = [
    { value: "dacaRenewal", label: "Daca Renewal" },
    { value: "citizenship", label: "Citizenship" },
  ];
  const handleApproveState = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setApproveState(value);
  };
  const handleRejectState = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRejectState(value);
  };
  const handleSelectCaseValue = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setSelectCaseValue(value.props.value);
    console.log(selectCaseValue);
  };
  switch (clientActionsState) {
    case 1:
      if (tabValue == "approve") {
        if (approveState == "approve-consultation") {
          return (
            <div className={`${styles.outline} ${styles.padding}`}>
              <h3>Client Actions</h3> 
              <p>
                Are you sure you want to approve this client for a consultation?
              </p>
              <div className={styles.buttons}>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => setClientActionsState(0)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setClientActionsState(2)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          );
        } else if (approveState == "approve-documents") {
          return (
            <div className={`${styles.outline} ${styles.padding}`}>
              <h3>Client Actions</h3> 
              <p>
                Are you sure you want to approve this client's documents?
              </p>
              <div className={styles.buttons}>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => setClientActionsState(0)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setClientActionsState(2)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          );
        } else {
          setClientActionsState(0);
        }
      } else {
        if (rejectState == "send-referral-link") {
          return (
            <div className={`${styles.outline} ${styles.padding}`}>
              <h3>Client Actions</h3> 
              <p>
                Are you sure you want to send a referral link to this client?
              </p>
              <div className={styles.buttons}>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => setClientActionsState(0)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setClientActionsState(2)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          );
        } else {
          setClientActionsState(0);
        }
      }
      
    case 2:
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <div className={styles.center}>
            <div className={styles.successNotif}>
              <StatusIcon completed={true} /> Success!
            </div>
          </div>
          <p className={styles.center}>
            This client has been notified of their approval.
          </p>
          <div className={styles.center}>
            <Button
              variant="contained"
              onClick={() => setClientActionsState(0)}
            >
              Go Back
            </Button>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${styles.outline} ${styles.padding}`}>
          <div className={styles.alignHorizontal}>
            <h3>Client Actions</h3> 
            {/*<FormControl fullWidth className={styles.selectCase}>
              <InputLabel id="demo-simple-select-label">Select Case</InputLabel>
              <Select 
                onChange={handleSelectCaseValue}
                value={selectCaseValue}
              >
                { map MenuItems here }
                {answerTypeOptionsTest.map((key, value) => 
                  <MenuItem value={key.value}>{key.label}</MenuItem>
                )}
                { use Shannon's set and get functions from mobile }
              </Select>
            </FormControl>*/}
          </div>
          <TabContext value={tabValue}>
            <TabList onChange={(event, newValue) => setTabValue(newValue)}>
              <Tab disableRipple label="approve" value="approve" />
              <Tab disableRipple label="reject" value="reject" />
            </TabList>
            <br />
            <div>
              <TabPanel value="approve" className={styles["no-padding"]}>
                <FormControl>
                  <RadioGroup
                    onChange={handleApproveState}
                    value={approveState}
                  >
                    <FormControlLabel
                      value="approve-consultation"
                      control={<Radio size="small" />}
                      label="Consultation"
                    />
                    <FormControlLabel
                      value="approve-documents"
                      control={<Radio size="small" />}
                      label="Documents approved"
                    />
                  </RadioGroup>
                </FormControl>
              </TabPanel>
              <TabPanel value="reject" className={styles["no-padding"]}>
                <RadioGroup
                  onChange={handleRejectState}
                  value={rejectState}
                >
                  <FormControlLabel
                    value="send-referral-link"
                    control={<Radio size="small" />}
                    label="Send referral link"
                  />
                </RadioGroup>
              </TabPanel>
            </div>
          </TabContext>
          <div className={styles.buttons}>
            <Button variant="outlined" className={styles.button}>
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={() => setClientActionsState(1)}
            >
              Send
            </Button>
          </div>
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
