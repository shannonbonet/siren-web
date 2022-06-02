import React from 'react';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./FormHolder.module.css";
import { QuestionType } from '../../../types';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface FormHolderProps {
    formTitle: string,
}

const FormHolder = (props: FormHolderProps) => {
    function getCaseName(key) {
        switch(key) {
          case QuestionType.General:
            return "General Questions";
          case QuestionType.Daca: 
            return "Daca Renewal Questions";
          case QuestionType.Adjustment:
            return "Adjustment Of Status Questions";
          case QuestionType.I90:
            return "I90 Questions";
          case QuestionType.Citizenship:
            return "Citizenship Questions";
          default:
            return "New Case Type Questions";
        }
      }
    

    const router = useRouter();
    return (
        <div className={styles.root}>
            <h3 className={styles.title}> <FeedOutlinedIcon /> {getCaseName(QuestionType[props.formTitle])}</h3>
            <div className={styles.icons}>                
                <Link href={{
                     pathname: "/IntakeForms/IntakeForm",
                     query: {key: props.formTitle}
                     }}>
                    <a onClick={() => {
                      router.query.key = props.formTitle;
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