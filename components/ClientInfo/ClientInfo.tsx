import styles from './ClientInfo.module.css';
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation } from "react-icons/ai";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { useState } from 'react';

var clientName = "Client Name"; // TODO: grab client name from firebase
  
export const ClientInfo = () => {   // TODO: implement ability to pass in client as argument
    return (
        <>
            <h2>{clientName}</h2>
            <div className={styles.grid}>
                <OverviewBox />
                <div>
                    <DocumentsBox />
                    <ClientActionsBox />
                </div>
            </div>
        </>
    )
}

// RENDER BOXES

const OverviewBox = () => {
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
                                {/* TODO: retrieve from firebase instead
                                <p><b>Legal disclaimer</b></p>
                                <p><b>Email</b><br />graceng@berkeley.edu</p>
                                <p><b>Telephone</b><br/>631-255-8829</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p> */}
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <h3>Basic Info</h3>
                            <div>
                                {/* TODO: retrieve from firebase instead
                                <p><b>Legal disclaimer</b></p>
                                <p><b>Email</b><br />graceng@berkeley.edu</p>
                                <p><b>Telephone</b><br/>631-255-8829</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p> */}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value='immigration' className={styles['no-padding']}>
                        <div className={styles.flex}>
                            <h3>Extra Info</h3>
                            <div>
                                {/* TODO: retrieve from firebase instead
                                <p><b>Favorite food</b><br />Pasta</p>
                                */}
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
            <div className={styles.flex}>
                {/* TODO: retrieve from firebase instead
                <StatusIcon completed={true} />
                    <p>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Employment Authorization Document</a>
                    <FiExternalLink className={styles.external} />
                    </p> */}
            </div>
            <div className={styles.flex}>
                {/* TODO: retrieve from firebase instead
                <StatusIcon completed={false} />
                    <p>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Employment Authorization Document</a>
                    <FiExternalLink className={styles.external} />
                    </p> */}
            </div>
        </div>
    );
}

const ClientActionsBox = () => {
    // TODO: depending on if send was successfully executed, change from ClientActions to ClientActionsSuccess
    //          - maybe have some const or var outside to give ability to change this
    const [clientActionsState, setClientActionsState] = useState(0);
    const [tabValue, setTabValue] = useState('approve');
    const sendSuccessful = clientActionsState; // TODO: change this
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
                                    <RadioGroup>
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
