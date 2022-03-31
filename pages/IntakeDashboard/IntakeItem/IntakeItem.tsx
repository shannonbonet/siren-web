import React, {useEffect, useState, } from 'react';
import styles from './IntakeItem.module.css';
import {ListItem} from '@mui/material';
import {getAllClients} from '../../../firebase/queries';
import {Client, Question} from '../../../types';
import {getClientResponsesOfType, getClient} from '../../../firebase/queries'






//update types from mobile 
interface ClientItemProps {
    response: Object;
    questions: Question[];

}

const renderResponses = (props: ClientItemProps) => {
    const respArr = new Array();
    for (const q in props.questions){
        const question = props.questions[q]['key'];
        if (props.response.hasOwnProperty(question) && typeof props.response[question] !== typeof Object){
            respArr.push(props.response[question]);
        } else {
            respArr.push("");
        }
    }
    return respArr;

}

const IntakeItem = (props: ClientItemProps) => {
    const resp = renderResponses(props);
    console.log(resp);

    return (
            <ListItem className={styles['list-item']}>
                <div className={styles['unique-id']}>10-51324</div>
                <div className={styles['name']}>{resp[0]}</div> 
                <div className={styles['a-num']}>{resp[11]}</div>
                <div className={styles['case-type']}>{resp[23]}</div>
                <div className={styles['status']}>Approved</div>
                <div className={styles['phone']}>{resp[2]}</div>
                <div className={styles['email']}>{resp[1]}</div>
                <div className={styles['county']}>{resp[4]}</div>
            </ListItem>
        )   
    }
    
    export default IntakeItem;


    /* 
    Unique ID -- cid (for now)
    Name -- responses['Name']
    Alien Reg Number ? responses['alienRegistrationNumber'] : "N/A"
    Case Type - responses['visitReason']
    Status - ?
    Phone Number - responses.telephone (i=2)
    Email - responses.email (i=1)
    City or Address - responses.address (i=3)
    */  