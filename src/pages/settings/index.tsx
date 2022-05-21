import Layout from '../../components/Layout'
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import { Button, Tab, Tabs, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ClientsTable from '../../components/SirenUserTable/ClientsTable';
import SirenUserTable from '../../components/SirenUserTable/SirenUserTable';
import SirenApprovalTable from '../../components/SirenUserTable/SirenApprovalTable';
import { getSirenUser } from '../../firebase/queries';



function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function Settings() {
    const { signOut, authUser } = useAuth();
    const [value, setValue] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const getCurrentUser = async () => {
        const user = await getSirenUser(authUser.uid);
        setCurrentUser(user);
    }
    
    useEffect(() => {
        if (authUser) {
            getCurrentUser();
        }
    }, [authUser]);

    return (
        <Layout>
            <h1>Settings</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Client Accounts" {...a11yProps(1)} />
                    {(currentUser && ['Super', 'Admin'].includes(currentUser.role)) ? 
                        [
                        <Tab label="Account Approvals" {...a11yProps(2)} key={2}/>,
                        <Tab label="Permissions" {...a11yProps(3)} key={3}/>
                        ]
                    : null}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Button variant="outlined" onClick={signOut} >Sign Out</Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ClientsTable/>
                </TabPanel>
                {(currentUser && ['Super', 'Admin'].includes(currentUser.role)) ?
                    [
                        <TabPanel value={value} index={2} key={2}>
                            <SirenApprovalTable/>
                        </TabPanel>,
                        <TabPanel value={value} index={3}>
                            <SirenUserTable currentUser={currentUser} key={3}/>
                        </TabPanel>
                    ]
                : null}
            </Box>
        </Layout>
    )
}
