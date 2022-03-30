import React, { useReducer, useState } from 'react';
import { IntakeFormOverlay } from '../../../components/IntakeFormOverlay/IntakeFormOverlay';
import  Question from "../../../components/Question/question";
import styles from "./GenQuestion.module.css"
import { List, arrayMove } from 'react-movable';

export default function GenQuestion() {

  // const initialState = {questions: []};
  // function reducer(state, action) {
  //   switch (action.type) {
  //     default:
  //       throw new Error();
  //   }
  // }
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <IntakeFormOverlay/>
    </div>
    )
}