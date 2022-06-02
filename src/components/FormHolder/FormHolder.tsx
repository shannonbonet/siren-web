import React from 'react';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./FormHolder.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { camelize } from '../../firebase/helpers';
import { setCaseType } from '../../firebase/queries';

interface FormHolderProps {
    formTitle?: string,
}

const FormHolder = ({formTitle="New Case Type"}: FormHolderProps) => {
    console.log("pre", formTitle);
    console.log("Camelize", camelize(formTitle));
    const router = useRouter();
    return (
        <div className={styles.root}>
            <h3 className={styles.title}> <FeedOutlinedIcon /> {formTitle} </h3>
            <div className={styles.icons}>                
                <Link href={{
                     pathname: "/IntakeForms/IntakeForm",
                     query: {key: formTitle}
                     }}>
                    <a onClick={() => {
                      router.query.key = formTitle;
                      setCaseType(formTitle);
                    }}>
                        <EditIcon />
                    </a>
                </Link>
                <DeleteIcon />
            </div>
        </div>
    )
}

export default FormHolder 