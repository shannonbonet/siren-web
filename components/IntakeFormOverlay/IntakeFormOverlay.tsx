import React, { useEffect, useState } from 'react';
import Link from 'next/dist/client/link';
import styles from "./IntakeFormOverlay.module.css";
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiUndo, BiRedo } from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import Button from "../Button/Button";
import {LinkForm} from "../LinkForm/LinkForm";
import TextareaAutosize from 'react-textarea-autosize';
import  Question from "../Question/question";
import { List, arrayMove } from 'react-movable';

export const IntakeFormOverlay
= () => {
  const [titleText, setTitleText] = useState("");
  const [questions, setQuestions] = useState([]);

  function addQuestion() {
    let list = [...questions];
    list.push(<Question key={list.length}/>);
    setQuestions(list);
  }
  return (
    <div className={styles["page"]}>
      <div className={styles["overlay"]}>
        <div className={styles["namebar"]}>
          <Link href="/">
            <IoIosArrowBack color="#0F2536"/>
          </Link>
          <TextareaAutosize
            cacheMeasurements
            value={titleText}
            placeholder="Untitled"
            onChange={ev => setTitleText(ev.target.value)}
            className={styles["title"]}/>
        </div>
        <div className={styles["changebar"]}>
          <IoEyeOutline size={36} />
          <BiUndo size={33}/>
          <BiRedo size={33}/>
          <button 
            className={styles["add-button"]}
            onClick={addQuestion}>
            <IoIosAddCircleOutline size={33}/>
          </button>
          <Button
            text='Save Changes'
            buttonType='button-clear'
            textType='button-text-jet'
            onPress={() => alert("SAVE!")}
          />
          <Button
            text='Publish Changes'
            buttonType='button-pruss'
            textType='button-text-white'
            onPress={() => alert("PUBLISH!")}
          />
          <BsThreeDotsVertical size={30}/>
        </div>
        <LinkForm/> 
      </div>
      <div className={styles["spacer"]}/>
        <div className={styles["questions"]}>
          <List
          values={questions}
          onChange={({ oldIndex, newIndex }) =>
            setQuestions(arrayMove(questions, oldIndex, newIndex))
          }
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined,  listStyleType:"none"}}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props }) => <li {...props}>{value}</li>}
                />
        </div>
    </div>
    )

} 

