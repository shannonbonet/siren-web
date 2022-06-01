import React from 'react';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./FormHolder.module.css";

interface FormHolderProps {
    formTitle: string,
}

const FormHolder = (props: FormHolderProps) => {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}> <FeedOutlinedIcon /> {props.formTitle}</h3>
            <div className={styles.icons}>
                <EditIcon />
                <DeleteIcon />
            </div>
        </div>
    )
}

export default FormHolder