import Layout from '../../components/Layout'
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import { Button, Tab, Tabs, Box, Typography } from '@mui/material';
import { useState } from 'react';
import SirenUserTable from '../../components/SirenUserTable/SirenUserTable';



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
    const { signOut } = useAuth();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Layout>
            <h1>Settings</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Permissions" {...a11yProps(1)} />
                    <Tab label="Client Accounts" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Button variant="outlined" onClick={signOut} >Sign Out</Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SirenUserTable/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </Layout>
    )
}
