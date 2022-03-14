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
    console.log(props.questions);

    return (
            <ListItem className={styles['list-item']}>
                <div className={styles['name-head']}>{resp[0]}</div>
                <div>
                    <input type='checkbox' className={styles['checkbox']}/>
                </div>
                <div className={styles['email']}>{resp[1]}</div>
                <div className={styles['phone']}>{resp[2]}</div>
                <div className={styles['address']}>{resp[3]}</div>
                <div className={styles['dob']}>{resp[5]}</div>
                <div className={styles['age']}>{resp[6]}</div>
                {resp.slice(7).map((r) => {
                    return(
                        <div key={r['Name']} className={styles['response']}>{r}</div>
                    )
                })}

            </ListItem>
        )   
    }
    
    export default IntakeItem;


    {/* <div className={styles['username']}>{props.clientName}</div>
    <div className={styles['action']}>
        <div><input type='checkbox'/></div>
    </div>
    <div className={styles['admin']}>{props.email}</div>
    <div className={styles['admin']}>{props.telephone}</div>
    <div className={styles['action']}>{props.address}</div>
    <div className={styles['date']}>{props.birthDate ? new Date(props.birthDate[0] * 1000).toLocaleDateString('en-US'): 'N/A'}</div>
    <div className={styles['fid']}>{props.age}</div>
    <div>

    </div> */}