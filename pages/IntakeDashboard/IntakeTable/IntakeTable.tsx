import React, {useState, useEffect} from 'react';
import IntakeItem from '../IntakeItem/IntakeItem';
import { Box } from '@mui/system';
import {List} from '@mui/material';
import {Client} from '../../../tempTypes';
import styles from './IntakeTable.module.css';
import itemstyles from '../IntakeItem/IntakeItem.module.css';
import {getAllQuestionsOfType, getAllClients} from '../../../firebase/queries';
import {Question} from '../../../types';

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
    //TODO: format css styles
    //TODO: getAllQuestionsOfType('general').map(q => header component)
    const [responses, setResponses] = useState<Array<Object>>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function loadClientResponses(){
            let clientAns: Array<Object> = new Array();

            //filter out clients w no answers
            const clients = (await getAllClients()).filter(c => c.answers !== undefined && Object.keys(c.answers).length >= 1);

            //add all client answer objects to array, then select 'general' responses
            for (const i in clients){
                clientAns.push(clients[i].answers);
            }
            const clientGenAns: Array<Object> = clientAns.map(c => c['general']);

            setResponses(clientGenAns);
        }
        loadClientResponses();

        async function loadQuestions(){
            const qList = await getAllQuestionsOfType('general');
            setQuestions(qList);
        }
        loadQuestions();
        
    }, []);



    const renderCategoryHeader = () => {
        return (
            <Box className={styles['section-header']}>
                <div className={itemstyles['name-head']} id={styles['category']}>
                    <body id={styles['category-text']}>Name</body>
                </div>
                <div className={itemstyles['action']} id={styles['category']}>
                    <body id={styles['category-text']}>Legal Disclaimer</body>
                </div>
                <div className={itemstyles['admin']} id={styles['category']}>
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
                {
                    questions.slice(7).map((q) => {
                        return(
                        <div key={q['order']} id={styles['category-text']}>
                            {q['displayText']}
                        </div>
                        )
                    })
                }
           </Box>
        )
    }
   
    
    const renderHistory = () => {
        const respNoBdate = responses.slice(8).concat(responses.slice(12,21));
        
        return(
            <List className={styles['list']}>
                {
                    responses.map((r) => {
                        return(
                            <IntakeItem key={r['telephone']} clientName={r['Name']} legalDisc={true} email={r['Email']} telephone={r['telephone']} address={r['address']} birthDate={r['dateOfBirth']} age={r['age']} responses={respNoBdate}/>
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