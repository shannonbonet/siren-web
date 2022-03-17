import styles from './ClientInfo.module.css';
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { AiOutlineExclamation } from "react-icons/ai";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { useState } from 'react';
  
export const ClientInfo = () => {   
    return (
        <>
            <h2>Shannon Fabiola Bonet</h2>
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
                                <p><b>Legal disclaimer</b></p>
                                <p><b>Email</b><br />graceng@berkeley.edu</p>
                                <p><b>Telephone</b><br/>631-255-8829</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <h3>Basic Info</h3>
                            <div>
                                <p><b>Legal disclaimer</b></p>
                                <p><b>Email</b><br />graceng@berkeley.edu</p>
                                <p><b>Telephone</b><br/>631-255-8829</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                                <p><b>Address</b><br/>2500 Durant Ave, Apt 407, Berkeley CA 94704</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value='immigration' className={styles['no-padding']}>
                        <div className={styles.flex}>
                            <h3>Extra Info</h3>
                            <div>
                                <p><b>Favorite food</b><br />Pasta</p>
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
                <StatusIcon completed={true} />
                <p>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Employment Authorization Document</a>
                    <FiExternalLink className={styles.external} />
                </p>
            </div>
            <div className={styles.flex}>
                <StatusIcon completed={false} />
                <p>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Passport</a>
                    <FiExternalLink className={styles.external} />
                </p>
            </div>
        </div>
    );
}

const ClientActionsBox = () => {
    const [tabValue, setTabValue] = useState('approve');
    return (
        <div className={`${styles.outline} ${styles.padding}`}>
            <h3>Client Actions</h3>
            <TabContext value={tabValue}>
                <TabList onChange={(event, newValue) => setTabValue(newValue)}>
                    <Tab disableRipple label='approve' value='approve' />
                    <Tab disableRipple label='reject' value='reject' />
                    <Tab disableRipple label='remind' value='remind' />
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
                        <p>???</p>
                    </TabPanel>
                    <TabPanel value='remind' className={styles['no-padding']}>
                        <p>???</p>
                    </TabPanel>
                </div>
            </TabContext>
            <div className={styles.buttons}>
                <Button variant="outlined" className={styles.button}>Clear</Button>
                <Button variant="contained">Send</Button>
            </div>
        </div>
    );
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
