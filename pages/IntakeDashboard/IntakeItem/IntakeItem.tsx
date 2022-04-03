import React from 'react';
import styles from './IntakeItem.module.css';
import {ListItem} from '@mui/material';



//update types from mobile 
interface ClientItemProps {
    response: Object;
}


const IntakeItem = (props: ClientItemProps) => {

    return (
            <ListItem className={styles['list-item']}>
                <div className={styles['unique-id']}>10-51324</div>
                <div className={styles['name']}>{props.response['Name']}</div> 
                <div className={styles['a-num']}>{props.response['alienRegistrationNumber']}</div>
                <div className={styles['case-type']}>{props.response['visitReason']}</div>
                <div className={styles['status']}>Approved</div>
                <div className={styles['phone']}>{props.response['telephone']}</div>
                <div className={styles['email']}>{props.response['Email']}</div>
                <div className={styles['county']}>{props.response['county']}</div>
            </ListItem>
        )   
    }
    
    export default IntakeItem;
