import React, { useState } from 'react';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./FormHolder.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCase, renameCase, setCaseType } from '../../firebase/queries';
import { TextareaAutosize } from '@mui/material';

interface FormHolderProps {
    staticTitle: string,
    id: string,
    connecterFunctions: {
        deleteForm: Function;
        dupesExist: Function;
        updateNameList: Function;
    }
}

const FormHolder = ({staticTitle, id, connecterFunctions}: FormHolderProps) => {
    const [dynamicTitle, setDynamicTitle] = useState(staticTitle);
    const router = useRouter();
    const {deleteForm, dupesExist, updateNameList} = connecterFunctions;
    router.query.key = staticTitle;
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <div className={styles.form}>
                    <FeedOutlinedIcon fontSize='large'/>
                </div>
                <TextareaAutosize
                    value={dynamicTitle}
                    className={styles.titleText}
                    placeholder="New Case Type"
                    onChange={(e) => {
                        let newName = e.target.value
                        updateNameList(id, newName);
                        setDynamicTitle(newName);
                        router.query.key = newName;
                    }}
                    />
            </div>
            <div className={styles.icons}>                
                <button className={styles.editButton} onClick={() => {
                    if (!dupesExist()) {
                        setCaseType(dynamicTitle).then(() => {
                            if (!(staticTitle === dynamicTitle)) {
                                renameCase(staticTitle, dynamicTitle)
                            }
                            router.push({
                                pathname: '/IntakeForms/IntakeForm',
                                query: {key: dynamicTitle, uploaded: 'false'}
                            })
                        })
                    } else {
                        window.alert("Duplicate Names Exist!");
                    }
                }}>
                    <EditIcon fontSize='large'/>
                </button>
                <button className={styles.deleteButton}
                onClick={() =>{
                    if (confirm('Are you sure you want to delete this case type?') == true) {
                        deleteForm(id, dynamicTitle);
                    }
                    }}>
                    <DeleteIcon fontSize='large'/>
                </button>
            </div>
        </div>
    )
}

export default FormHolder 