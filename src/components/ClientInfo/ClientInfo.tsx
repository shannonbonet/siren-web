import styles from './ClientInfo.module.css';
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation } from "react-icons/ai";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { useState } from 'react';
import {getAllClients} from '../../firebase/queries';
import { Client } from '/types';

  
export const ClientInfo = ( {query} ) => {   
    const [client, setClient] = useState<Client>(null);
    async function loadClientResponses(){
        // get the correct client
        const correctClient = (await getAllClients()).filter(c => c.answers !== undefined && Object.keys(c.answers).length >= 1 && c.id == query["id"]);
        setClient(correctClient[0]);
        console.log(client as Client);
        console.log((client &&  client.answers && client.answers.general) ? client.answers.general : "not loaded");
    }
    loadClientResponses();

    return (
        <>
            <h2>{(client &&  client.answers && client.answers.general) ? client.answers.general.Name : query["fullName"]}</h2>
            <div className={styles.grid}>
                <OverviewBox client={client}/>
                <div>
                    <DocumentsBox />
                    <ClientActionsBox />
                </div>
            </div>
        </>
    )
}

// RENDER BOXES

const OverviewBox = ({client}) => {
    const [tabValue, setTabValue] = useState('overview');
    return (
        <div className={`${styles.outline} ${styles.overview}`}>
            <TabContext value={tabValue}>
                <TabList onChange={(event, newValue) => setTabValue(newValue)}>
                    <Tab disableRipple label='overview' value='overview' />
                    <Tab disableRipple label='immigration' value='immigration' />
                </TabList>
                <br />
                <div>
                    <TabPanel value='overview' className={styles['no-padding']}>
                        <div className={styles.flex}>
                            <h3>Basic Info</h3>
                            <div>
                                {(client && client.answers && client.answers.general) ? Object.keys(client.answers.general).map((key) => (
                                    (key=="Name" || (key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Covid") 
                                                 || (key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Law")
                                                 || (key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Alien")) ? null : <p><b>{key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)}</b><br />{client.answers.general[key]}</p>
                                )) : null}
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <h3>COVID-19</h3>
                            <div>
                                {(client && client.answers && client.answers.general) ? Object.keys(client.answers.general).map((key) => (
                                    ((key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Covid")) ? <p><b>{key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)}</b><br />{client.answers.general[key]}</p> : null
                                )) : null}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value='immigration' className={styles['no-padding']}>
                        <div className={styles.flex}>
                            <h3>Background</h3>
                            <div>
                                {(client && client.answers && client.answers.general) ? Object.keys(client.answers.general).map((key) => (
                                    ((key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Alien")) ? <p><b>{key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)}</b><br />{client.answers.general[key]}</p> : null
                                )) : null}
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <h3>Criminal Record</h3>
                            <div>
                                {(client && client.answers && client.answers.general) ? Object.keys(client.answers.general).map((key) => (
                                    ((key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)).includes("Law")) ? <p><b>{key.charAt(0).toUpperCase() + key.replace(/[A-Z]/g, ' $&').trim().slice(1)}</b><br />{client.answers.general[key]}</p> : null
                                )) : null}
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    )
}



const DocumentsBox = () => {
    return (
        <div className={`${styles.outline} ${styles.padding}`}>
            <h3>Documents</h3>
            {/* USE THIS:  window.open('/Export/PrintPdf'); 
                    - make function that will open the link
                    - let <a> call the function on click
            */}
            {/*<div className={styles.flex}>
                <StatusIcon completed={true} />
                <p>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Employment Authorization Document</a>
                    <FiExternalLink className={styles.external} />
                </p> 
            </div>*/}
        </div>
    );
}

const ClientActionsBox = () => {
    const [clientActionsState, setClientActionsState] = useState(0);
    const [approveState, setApproveState] = useState('');
    const [tabValue, setTabValue] = useState('approve');
    const sendSuccessful = clientActionsState;
    const handleApproveState = ev => {
        setApproveState(); // TODO: set approve state correctly
    }
    switch ( sendSuccessful ) {
        case 1:
            return(
                <div className={`${styles.outline} ${styles.padding}`}>
                    <h3>Client Actions</h3>
                    <p>Are you sure you want to approve this client for a consultation?</p>
                    <div className={styles.buttons}>
                        <Button variant="outlined" className={styles.button} onClick={() => setClientActionsState(0)}>Back</Button>
                        <Button variant="contained" onClick={() => setClientActionsState(2)}>Confirm</Button>
                    </div>
                </div>)
        case 2:
            return(
                <div className={`${styles.outline} ${styles.padding}`}>
                    <div className={styles.center}>
                        <div className={styles.successNotif}><StatusIcon completed={true} /> Success!</div>
                    </div>
                    <p className={styles.center}>This client has been notified of their approval.</p>
                    <div className={styles.center}><Button variant="contained" onClick={() => setClientActionsState(0)}>Go Back</Button></div>
                </div>)
        default: 
            return (
                <div className={`${styles.outline} ${styles.padding}`}>
                    <h3>Client Actions</h3>
                    <TabContext value={tabValue}>
                        <TabList onChange={(event, newValue) => setTabValue(newValue)}>
                            <Tab disableRipple label='approve' value='approve' />
                            <Tab disableRipple label='reject' value='reject' />
                        </TabList>
                        <br />
                        <div>
                            <TabPanel value='approve' className={styles['no-padding']}>
                                <FormControl>
                                    <RadioGroup onChange={handleApproveState} value={approveState}>
                                        <FormControlLabel value="approve-consultation" control={<Radio size="small" />} label="Consultation" />
                                        <FormControlLabel value="approve-documents" control={<Radio  size="small"/>} label="Documents approved" />
                                    </RadioGroup>
                                </FormControl>
                            </TabPanel>
                            <TabPanel value='reject' className={styles['no-padding']}>
                                <RadioGroup>
                                    <FormControlLabel value="send-referral-link" control={<Radio size="small" />} label="Send referral link" />
                                </RadioGroup>
                            </TabPanel>
                        </div>
                    </TabContext>
                    <div className={styles.buttons}>
                        <Button variant="outlined" className={styles.button}>Clear</Button>
                        <Button variant="contained" onClick={() => setClientActionsState(1)}>Send</Button>
                    </div>
                </div>
            );
     }
}

const StatusIcon = ({ completed }) => {
    if (completed) {
        return (
            <span className={`${styles.status} ${styles.blue}`}>
                <FiCheck style={{ stroke: 'white' }} />
            </span>
        )
    }
    return (
        <span className={`${styles.status} ${styles.red}`}>
            <AiOutlineExclamation style={{ fill: 'white' }} />
        </span>
    )
}
