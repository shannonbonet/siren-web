import React, { useEffect, useState, useReducer } from 'react';
import Link from 'next/dist/client/link';
import styles from "./IntakeForm.module.css";
import { IoIosArrowBack, IoIosAddCircleOutline,  } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline,  IoTrashOutline } from "react-icons/io5";
import { BiUndo, BiRedo } from "react-icons/bi";
import { MdContentCopy } from 'react-icons/md';
import {BsThreeDotsVertical} from "react-icons/bs";
import Button from "../Button/Button";
import {LinkForm} from "../LinkForm/LinkForm";
import TextareaAutosize from 'react-textarea-autosize';
import  Question from "../Question/question";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from "next/image";
import Toggle from 'react-toggle';
import dragDots from "../../../assets/images/dragDots.png";



enum IntakeActionTypes {
  ADD = "add",
  REMOVE = "remove",
  UNDO = "undo",
  REDO = "redo"
}

const IntakeForm = () => {
  const [titleText, setTitleText] = useState("");
  const [required, setRequired] = useState(false);
  var initialState = {
    ids: [],
    questions: [],
    past: [],
    future: []
  }
  const [qState, dispatch] = useReducer(intakeReducer, initialState);

  const getDraggable = (question, index) => {
    return (
      <Draggable key={qState.ids[index]} index ={index} draggableId={qState.ids[index]}>
         {(provided, snapshot) => {
          if (snapshot.isDragging) {
              const offset = { x: -1*(window.innerWidth * 0.193) , y: -1*(window.innerHeight*0.01) }
              const x = provided.draggableProps.style.left - offset.x;
              const y = provided.draggableProps.style.top - offset.y;
              provided.draggableProps.style.left = x;
              provided.draggableProps.style.top = y;
           }
           return (
              <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              className={styles.container}>
                <div 
                className={styles["dragDots"]}
                {...provided.dragHandleProps}
                >
                  <Image 
                  src={dragDots} 
                  alt="draghere"/>
                </div>
                {question}
                <div className={styles.bottombuttons}>
					        <span className={styles.requiredspan}>Required</span>
                  <Toggle
                    checked={required}
                    icons={false}
                    onChange={() => setRequired(!required)}
                  />
                  <button className={styles.copybutton}>
                    <MdContentCopy size="27px"/>
                  </button>
                  <button 
                    className={styles.trashbutton}
                    onClick={() => dispatch({type: IntakeActionTypes.REMOVE, payload: qState.ids[index]})}>
                    <IoTrashOutline size="27px"/>
                  </button>
			          </div>
              </div>
           );
       }}
      </Draggable>
    )
  }
  
  function intakeReducer(state, action){
    var newState = {
      ids: [...state.ids],
      questions: [...state.questions],
      past: [...state.past],
      future: [...state.future]
    }
    switch (action.type) {
      case IntakeActionTypes.ADD:
        const id: string = Math.random().toString(36).slice(2).valueOf();
        newState.past.push([newState.ids, newState.questions])
        newState.ids.push(id);
        newState.questions.push(<Question/>);
        newState.future=[];
        return newState;
      case IntakeActionTypes.REMOVE:
        newState.past.push([newState.ids, newState.questions])
        const targetIndex = newState.ids.findIndex(q => q === action.payload);
        newState.ids.splice(targetIndex, 1);
        newState.questions.splice(targetIndex, 1);
        newState.future=[];
        return newState;
      case IntakeActionTypes.UNDO:
        if (newState.past.length > 0) {
          let pastState = newState.past.pop();
          newState.future.push([newState.ids, newState.questions]);
          newState.ids = pastState[0];
          newState.questions = pastState[1];
        }
        return newState;
      case IntakeActionTypes.REDO:
        if (newState.future.length > 0) {
          let futureState = newState.future.pop();
          newState.past.push([newState.ids, newState.questions]);
          newState.ids = futureState[0];
          newState.questions = futureState[1];
        }
        return newState;
      default:
        return state;
    }
  }

  const reorder = (list, source, destination) => {
    const newList = Array.from(list);
    const [movedItem] = newList.splice(source, 1);
    newList.splice(destination, 0, movedItem);
    return newList;
  }

  const onDragEnd = (result) => {
    const { destination, source} = result;
    if (!result.destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newQuestions = reorder(qState.questions, source.index, destination.index);
    const newQuestionIds = reorder(qState.ids, source.index, destination.index);
    qState.questions = newQuestions;
    qState.ids = newQuestionIds;
  }

  function Overlay() {
    return(
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
            <button
              className={styles["undo-redo"]}
              onClick={() => dispatch({type: IntakeActionTypes.UNDO})}>
              <BiUndo size={33}/>
            </button>
            <button
              className={styles["undo-redo"]}
              onClick={() => dispatch({type: IntakeActionTypes.REDO})}>
              <BiRedo size={33}/>
            </button>
            <button
              className={styles["add-button"]}
              onClick={() => dispatch({type: IntakeActionTypes.ADD})}>
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
    )
  }

  return (
    <DragDropContext
    className={styles["context"]}
    onDragEnd={onDragEnd}>
      <div className={styles["page"]}>
        {Overlay()}
        <div className={styles["spacer"]}/>
        <Droppable
        droppableId="questionsList"
        >
          {(droppableProvided) => (
            <div
            className={styles["questions"]}
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            >
              {qState.questions.map((q, index) => (getDraggable(q, index)))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
} 

export default IntakeForm;