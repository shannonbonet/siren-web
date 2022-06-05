import React, { useState } from 'react';    
import styles from './ClientInfo.module.css';   
import { updateStatus } from '../../firebase/queries';
import { Case, CaseKey, CaseStatus } from '../../../types';
import {
    Button,
    TextField,
    CircularProgress
  } from "@mui/material";
import { StatusIcon } from './DocumentsBox';



const ClientActionsBox = ({client, cases, caseInfo}) => {
    const [clientActionsState, setClientActionsState] = useState("select");
    const [selectCaseValue, setSelectCaseValue] = useState("");
    const [selectedCaseInfo, setSelectedCaseInfo] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    // TODO: implement referral link
    // const [referralLink, setReferralLink] = useState('');
  
    const handleReject = () => {
      if (selectCaseValue) {
        setClientActionsState("confirm reject");
      }
    };
    // This function is triggered when the select changes
    const handleSelectCaseValue = (event) => {
      setSelectCaseValue(event.target.value);
      const caseFromType = getCaseFromType(event.target.value);
      setSelectedCaseInfo(caseFromType);
      console.log(caseFromType);
    };
    const handleAccept = (event) => {
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
    const caseSelectedComp = () => {
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
              Are you sure you want to approve this client`&rsquo;`s case for a consultation?
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
              Are you sure you want to reject this client`&rsquo;`s case?
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
                  Don`&rsquo;`.t send Referral Link
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
                    <option key={key} value={key.key}>{key.key}</option> //what is key.key?
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
                    onClick={handleReject} 
                    className={styles.button}>
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAccept}
                  >
                    Accept for Consultation
                  </Button>
                </div> )
            : null}
          </div>
        );
    }
  };

export default ClientActionsBox;