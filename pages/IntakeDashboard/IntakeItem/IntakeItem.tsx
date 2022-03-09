import React, {useEffect, useState, } from 'react';
import styles from './IntakeItem.module.css';
import {ListItem} from '@mui/material';
import {getAllClients} from '../../../firebase/queries';
import {Client} from '../../../types';
import {getClientResponsesOfType, getClient} from '../../../firebase/queries'






//update types from mobile 
interface ClientItemProps {
    clientName: string;
    legalDisc: boolean;
    email: string;
    telephone: number;
    address: string;
    birthDate?: Object;
    age: number;
    responses: Object[];

}

const IntakeItem = (props: ClientItemProps) => {

    return (
            <ListItem className={styles['list-item']}>
                <div className={styles['username']}>{props.clientName}</div>
                <div className={styles['action']}>
                    <div><input type='checkbox'/></div>
                </div>
                <div className={styles['admin']}>{props.email}</div>
                <div className={styles['admin']}>{props.telephone}</div>
                <div className={styles['action']}>{props.address}</div>
                <div className={styles['date']}>{props.birthDate ? new Date(props.birthDate[0] * 1000).toLocaleDateString('en-US'): 'N/A'}</div>
                <div className={styles['fid']}>{props.age}</div>
                <div>
                {
                    props.responses?.map((r) => {
                        return(
                        Object.entries(r).slice(3).map((entry) => { 
                            return(
                                <div key={entry['telephone']}>{entry[1]}</div>
                            )
                        })
                        )
                    })
                }
                </div>
            </ListItem>
        )   
}

export default IntakeItem;

//mock intake item: <IntakeItem clientName='Noah Alexander Hernandez' legalDisc={true} email='noahh_@berkeley.edu' telephone={8187988597} address='2225 Channing Way, Berkeley, CA, 94704' birthDate='01/09/2003' age={13}/>
{/* 
); */}