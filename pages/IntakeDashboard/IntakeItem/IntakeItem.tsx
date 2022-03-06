import React, {useEffect, useState, } from 'react';
import styles from './IntakeItem.module.css';
import {ListItem} from '@mui/material';





//update types from mobile 
interface ClientItemProps {
    clientName: string;
    legalDisc: boolean;
    email: string;
    telephone: number;
    address: string;
    birthDate: string;
    age: number;

}

const IntakeItem = (props: ClientItemProps) => {

    //TODO: useEffect => getClients + getResponses from firebase --> map to props
    

    return (
        <ListItem className={styles['list-item']}>
            <div>{props.clientName}</div>
            <div>
                {
                    props.legalDisc?
                    <div><input type='checkbox'checked/></div>:
                    <div ><input type='checkbox'/></div>
                }
            </div>
            <div>{props.legalDisc}</div>
            <div>{props.email}</div>
            <div>{props.telephone}</div>
            <div>{props.address}</div>
            <div className={styles['date']}>{props.birthDate}</div>
            <div>{props.age}</div>
        </ListItem>
    );
}

export default IntakeItem;

//mock intake item: <IntakeItem clientName='Noah Alexander Hernandez' legalDisc={true} email='noahh_@berkeley.edu' telephone={8187988597} address='2225 Channing Way, Berkeley, CA, 94704' birthDate='01/09/2003' age={13}/>