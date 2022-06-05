import React, { useState } from 'react';
import styles from './ClientInfo.module.css';
import { FiCheck , FiExternalLink } from 'react-icons/fi';
import { AiOutlineExclamation } from 'react-icons/ai';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const caseOptions = new Map<string, string>([
    ["I90", "I-90"],
    ["adjustmentOfStatus", "Adjustment Of Status"],
    ["citizenship", "Citizenship"],
    ["dacaRenewal", "DACA Renewal"],
]);     


export const StatusIcon = ({ completed }) => {
  if (completed) {
    return (
      <span className={`${styles.status} ${styles.blue}`}>
        <FiCheck style={{ stroke: "white" }} />
      </span>
    );
  }
  return (
    <span className={`${styles.status} ${styles.red}`}>
      <AiOutlineExclamation style={{ fill: "white" }} />
    </span>
  );
};

const DocumentsBox = ({ cases, clientDocsToCase }) => {
    const [selectCaseValue, setSelectCaseValue] = useState('');
    // This function is triggered when the select changes
    const handleSelectCaseValue = (event) => {
      setSelectCaseValue(event.target.value);
    };
    // function to render document list
    const displayDocList = () => {
      const cas = cases.filter((element) => {
        return element.key == selectCaseValue
      });
      console.log('case', cas)
      const docsToCase = (clientDocsToCase ? clientDocsToCase.filter((element) => {
        return caseOptions.get(element[0].type) == selectCaseValue
      }) : null);
      const docs = (docsToCase && docsToCase[0] ? docsToCase[0][1] : null)
      if (!docs) {
        return (<p>Documents are loading...</p>);
      } else {
        return (
          cas[0]['documentList'].map((doc) => (
            displayDoc(docs, doc)
          ))
        );
      } 
    };
    // returns document link component to render
    const displayDoc = (docs, doc) => {
      let url = '';
      const docExists = (docs ? ((docs.filter((element) => {
        const found = element.type == doc;
        if (found) {
          url = element.url;
        }
        return found;
      })).length > 0) : false);
      if (docExists) {
        return (<div className={`${styles.alignHorizontal} ${styles.docEntry}`} key={doc}>
         <div className={styles.docAlign}> <StatusIcon completed={true} /></div>
          <p>
            <a href={url} rel="noopener noreferrer" target="_blank">
              {doc}
            </a>
            <FiExternalLink className={styles.external} />
          </p> 
        </div>)
      } else {
        return (<div className={`${styles.alignHorizontal} ${styles.docEntry}`} key={doc}>
          <div className={styles.docAlign}> <StatusIcon completed={false} /></div>
          <p>
            {doc}
          </p> 
        </div>)
      }
    }
    // render
    return (
      <div className={`${styles.outline} ${styles.padding}`}>
        <div className={styles.alignHorizontal}>
          <h3 className={styles.flex}>Documents</h3>
          {cases ? 
        //   USE MUI COMPONENT
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                value={selectCaseValue}
                label="Case"
                onChange={handleSelectCaseValue}
                >
                {cases.map((key, value) => 
                <MenuItem key={key} value={key.key}>{key.key}</MenuItem>)}
                </Select>
            </FormControl>
        //   <select onChange={handleSelectCaseValue} value={selectCaseValue} className={styles.flex}>
        //     <option selected disabled>
        //       Select Case
        //     </option>
        //     {cases.map((key, value) => 
        //       <option key={key} value={key.key}>{key.key}</option>
        //     )}
           : null}
        </div>
          { selectCaseValue ? displayDocList() : null }
      </div>
    );
  };

export default DocumentsBox;