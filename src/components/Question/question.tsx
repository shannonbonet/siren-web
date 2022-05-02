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
import { QuestionType, AnswerType } from "../../../types";

interface questionProps {
  id?: string; 
  displayText?: Map<string, string>;
  description?: Map<string, string>; 
  example?: Map<string, string>;
  questionType?: QuestionType;
  key?: string;
  order?: number;
  active?: boolean;
  typeAnswer?: AnswerType;
  optionAnswer?: Map<string, string[]>;
}


const Question = ({
  id = firestoreAutoId(),
  displayText = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  description = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  example = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  questionType = QuestionType.Daca,
  key = "",
  order = 1,
  active = false,
  typeAnswer = null,
  optionAnswer = new Map([['EN', ['Option']], ['ES', ['Option']], ['VIET', ['Option']]])}
  :questionProps
) => {
  const [questionText, setQuestionText] = useState(displayText.get('EN'));
  const [descriptionText, setDescriptionText] = useState(description.get('EN'));
  const [answerOptions, setAnswerOptions] = useState(optionAnswer.get('EN'));
  const answerTypeOptions = [
    { value: "smallInput", label: "Short answer" },
    { value: "date", label: "Date" },
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

  const getAnswerTypeComponent = () => {
    if (answerType.value === "smallInput") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value="Short answer text"
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
            value="Long answer text"
            className={styles.longText}
          />
        </div>
      );
    } else if (answerType.value === "date") {
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

  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <TextareaAutosize
          cacheMeasurements
          value={questionText}
          placeholder="Question"
          onChange={(ev) => setQuestionText(ev.target.value)}
          className={styles.questionText}
        />
        <Select
          options={answerTypeOptions}
          onChange={setAnswerType}
          defaultValue={answerType}
          className={styles.answerType}
        />
      </div>
      <div className={styles.middlecontainer}>
        <TextareaAutosize
          cacheMeasurements
          value={descriptionText}
          placeholder="Description"
          onChange={(ev) => setDescriptionText(ev.target.value)}
          className={styles.longText}
        />
        <button
         className={styles.saveButton}
        //  onClick={setQuestion({
        //   id: firestoreAutoId(),
        //   displayText: new Map([["EN:", questionText], ["ES:", questionText], ["VIET", questionText]]),
        //   description: new Map([["EN:", descriptionText], ["ES:", descriptionText], ["VIET", descriptionText]]),
        //   example: new Map([["EN:", ""], ["ES:", ""], ["VIET", ""]]),
        //   questionType: QuestionType.Daca,
        //   key: firestoreAutoId(),
        //   order:0,
        //   active: true,
        //   answerType: answerType,
        //   answerOptions?:
        //  })}
        >Save
        </button>
      </div>
      {answerType ? getAnswerTypeComponent() : null}
    </div>
  );
};

export default Question;
