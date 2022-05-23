import TextareaAutosize from "react-textarea-autosize";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Select from "react-select";
import {
  IoCloseOutline,
  IoRadioButtonOffOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import "react-toggle/style.css";
import { setQuestion } from "../../firebase/queries";
import { firestoreAutoId } from "../../firebase/helpers";
import { QuestionType, AnswerType, QuestionComponentProps } from "../../../types";
import {updateMap as changeMap} from "../IntakeForm/IntakeForm";


const Question = ({
  id = firestoreAutoId(),
  displayText = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  description = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  example = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  questionType = QuestionType.Daca,
  accessKey = firestoreAutoId(),
  order = 0,
  active = false,
  typeAnswer = null,
  optionAnswer = new Map([['EN', ['Option']], ['ES', ['Option']], ['VIET', ['Option']]])}
  :QuestionComponentProps
) => {
  const updateMap = changeMap;
  const [questionText, setQuestionText] = useState(displayText.get('EN'));
  const [descriptionText, setDescriptionText] = useState(description.get('EN'));
  const [answerOptions, setAnswerOptions] = useState(optionAnswer.get('EN'));
  const answerTypeOptions = [
    { value: "smallInput", label: "Short answer" },
    { value: "calendar", label: "Date" },
    { value: "radio", label: "Multiple Choice" },
    { value: "largeInput", label: "Long answer" },
    { value: "checkbox", label: "Checkbox" },
    { value: "dropdown", label: "Dropdown" },
  ];
  const [answerType, setAnswerType] =
   useState(typeAnswer === null ? null : 
    answerTypeOptions[answerTypeOptions.findIndex(o => {return o.value === typeAnswer})]);

  const getAnswerOptions = (icon) => {
    let components = [];
    for (let i = 0; i < answerOptions.length; i++) {
      components.push(
        <div className={styles.bottomcontainericon} key={i}>
          {icon}
          <TextareaAutosize
            cacheMeasurements
            value={answerOptions[i]}
            className={styles.multiText}
            placeholder="Option"
            onChange={(ev) => {
              let options = [...answerOptions];
              options[i] = ev.target.value;
              setAnswerOptions(options);
              updateMap(id, "answerOptions", answerOptions)
            }}
          />
          <button
            onClick={() => {
              let options = [...answerOptions];
              options.splice(i, 1);
              setAnswerOptions(options);
            }}
            className={styles.removeOption}
          >
            <IoCloseOutline size="16px" />
          </button>
        </div>
      );
    }
    return components;
  };


  const unfilled = displayText.get('EN').length == 0;

  const getAnswerTypeComponent = () => {
    if (answerType.value === "smallInput") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value= {unfilled ? 'Short answer text' : displayText.get('EN')}
            className={styles.shortText}
          />
        </div>
      );
    } else if (answerType.value === "largeInput") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value={unfilled ? 'Long answer text' : displayText.get('EN')}
            className={styles.longText}
          />
        </div>
      );
    } else if (answerType.value === "calendar") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value="MM/DD/YYYY"
            className={styles.shortText}
          />
          <div className={styles.calendardiv}>
            <IoCalendarOutline size="20px" />
          </div>
        </div>
      );
    } else {
      const icon =
        answerType.value === "radio" ? (
          <IoRadioButtonOffOutline size="20px" />
        ) : answerType.value === "checkbox" ? (
          <MdOutlineCheckBoxOutlineBlank size="20px" />
        ) : null;
      return (
        <div className={styles.bottomcontainercolumn}>
          {getAnswerOptions(icon)}
          <button
            className={styles.addOption}
            onClick={() => {
              let options = [...answerOptions];
              options.push("Option");
              setAnswerOptions(options);
            }}
          >
            + Add Option
          </button>
        </div>
      );
    }
  };

  const updateQuestionText = (ev) => {
    setQuestionText(ev.target.value);
    updateMap(id, "displayText", ev.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <TextareaAutosize
          cacheMeasurements
          value={questionText}
          placeholder="Question"
          onChange={ev => updateQuestionText(ev)}
          className={styles.questionText}
        />
        <Select
          options={answerTypeOptions}
          onChange={e => {setAnswerType; updateMap(id, "answerType", answerType)}}
          defaultValue={answerType}
          className={styles.answerType}
        />
      </div>
      <div className={styles.middlecontainer}>
        <TextareaAutosize
          cacheMeasurements
          value={descriptionText}
          placeholder="Description"
          onChange={(ev) => {setDescriptionText(ev.target.value); updateMap(id, "description", ev.target.value)}}
          className={styles.longText}
        />
        <button
         className={styles.saveButton}
        >Save
        </button>
      </div>
      {answerType ? getAnswerTypeComponent() : null}
    </div>
  );
};

export default Question;
