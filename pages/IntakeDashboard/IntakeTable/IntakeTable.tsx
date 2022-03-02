import React from 'react';
import IntakeItem from '../IntakeItem/IntakeItem';
import { Box } from '@mui/system';
import {List} from '@mui/material';
import {Client} from '../../../tempTypes';
import styles from './IntakeTable.module.css';
import itemstyles from '../IntakeItem/IntakeItem.module.css';
import {getAllQuestionsOfType} from '../../../firebase/queries';

interface IntakeTableProps {
    intake: Client[]
}

const testClient: Client = {
    cid: 13,
    clientName: 'Noah Hernandez',
    legalDisc: true,
    email: 'noahh_@berkeley.edu',
    telephone: 8187988597,
    address: '2225 Channing Way, Apt. 201, Berkeley, CA',
    birthDate: '01/09/2003',
    age: 5
};

const testClient2: Client = {
    cid: 36,
    clientName: 'Jared Keating',
    legalDisc: true,
    email: 'j2002@berkeley.edu',
    telephone: 7995883292,
    address: '2400 Durant Ave., Berkeley, CA',
    birthDate: '01/09/2003',
    age: 19

}
//<IntakeItem key={client.cid} clientName={client.clientName} legalDisc={client.legalDisc} email={client.email} telephone={client.telephone} address={client.address} birthDate={client.birthDate} age={client.age}/>

const testClientArray: Client[] = [testClient, testClient2];

const questions = getAllQuestionsOfType('general');



export const IntakeTable = (props: IntakeTableProps) => {

    const renderCategoryHeader = () => {
        return (
            <Box className={styles['section-header']}>
                <Box className={itemstyles['username']} id={styles['category']}>
                    <body id={styles['category-text']}>Name</body>
                </Box>
                <div className={itemstyles['action']} id={styles['category']}>
                    <body id={styles['category-text']}>Legal Disclaimer</body>
                </div>
                <div id={styles['category']}>
                    <body id={styles['category-text']}>Email</body>
                </div>
                <div className={itemstyles['admin']} id={styles['category']}>
                    <body id={styles['category-text']}>Phone Number</body>
                </div>
                <div className={itemstyles['action']} id={styles['category']}>
                    <body id={styles['category-text']}>Address</body>
                </div>
                <div className={itemstyles['date']} id={styles['category-text']}>Birth Date</div>
                <div className={itemstyles['fid']} id={styles['category-text']}>Age</div>
            </Box>
        )
    }

    const renderHistory = () => {

        return(
            <List className={styles['list']}>
                {
                    testClientArray.map((client) => {
                        return(
                            <IntakeItem key={client.cid} clientName={client.clientName} legalDisc={client.legalDisc} email={client.email} telephone={client.telephone} address={client.address} birthDate={client.birthDate} age={client.age}/>
                        )
                    })
                }
            </List>
        )
    }

   return (
       <div>
            {renderCategoryHeader()}
            {renderHistory()}
       </div>

   );
}