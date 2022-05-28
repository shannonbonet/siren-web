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
import { QuestionType, AnswerType, QuestionComponentProps, Language } from "../../../types";
import {updateMap as changeMap} from "../IntakeForm/IntakeForm";


const Question = ({
  id,
  displayText = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  description = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  example = new Map([['EN', ''], ['ES', ''], ['VIET', '']]),
  questionType = QuestionType.Daca,
  key = firestoreAutoId(),
  order,
  active = false,
  answerType = null,
  answerOptions = new Map([['EN', ['Option']], ['ES', ['Option']], ['VIET', ['Option']]]),
  language = Language.English,
}
  :QuestionComponentProps
) => {
  const updateMap = changeMap;
  const [questionText, setQuestionText] = useState(displayText.get(language));
  const [descriptionText, setDescriptionText] = useState(description.get(language));
  const [answerOption, setAnswerOption] = useState(answerOptions.get(language));
  const answerTypeOptions = [
    { value: "smallInput", label: "Short answer" },
    { value: "calendar", label: "Date" },
    { value: "radio", label: "Multiple Choice" },
    { value: "largeInput", label: "Long answer" },
    { value: "checkbox", label: "Checkbox" },
    { value: "dropdown", label: "Dropdown" },
  ];
  const [typeOfAnswer, setAnswerType] =
   useState(answerType === null ? null : 
    answerTypeOptions[answerTypeOptions.findIndex(o => {return o.value === answerType})]);
  const languageOptions = [
    {value: "EN", label: "English"},
    {value: "ES", label: "Spanish"},
    {value: "VIET", label: "Vietnamese"},
  ];
  const [languageOption, setLanguage] = useState(
    languageOptions[languageOptions.findIndex(o => {return o.value === language})]);
  const changeLanguage = (lang) => {
    setQuestionText(displayText.get(lang));
    setDescriptionText(description.get(lang));
    setAnswerOption(answerOptions.get(lang));
  }
  const getAnswerOptions = (icon) => {
    let components = [];
    for (let i = 0; i < answerOption.length; i++) {
      components.push(
        <div className={styles.bottomcontainericon} key={i}>
          {icon}
          <TextareaAutosize
            cacheMeasurements
            value={answerOption[i]}
            className={styles.multiText}
            placeholder="Option"
            onChange={(ev) => {
              let options = [...answerOption];
              options[i] = ev.target.value;
              setAnswerOption(options);
              answerOptions.set(languageOption.value, options);
              updateMap(id, "answerOptions", answerOptions);
            }}
          />
          <button
            onClick={() => {
              let options = [...answerOption];
              options.splice(i, 1);
              setAnswerOption(options);
              answerOptions.set(languageOption.value, answerOption);
              updateMap(id, "answerOptions", answerOptions);
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
    if (typeOfAnswer.value === "smallInput") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value= {'Short answer text'}
            className={styles.shortText}
          />
        </div>
      );
    } else if (typeOfAnswer.value === "largeInput") {
      return (
        <div className={styles.bottomcontainerrow}>
          <TextareaAutosize
            cacheMeasurements
            readOnly
            value={'Long answer text'}
            className={styles.longText}
          />
        </div>
      );
    } else if (typeOfAnswer.value === "calendar") {
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
        typeOfAnswer.value === "radio" ? (
          <IoRadioButtonOffOutline size="20px" />
        ) : typeOfAnswer.value === "checkbox" ? (
          <MdOutlineCheckBoxOutlineBlank size="20px" />
        ) : null;
      return (
        <div className={styles.bottomcontainercolumn}>
          {getAnswerOptions(icon)}
          <button
            className={styles.addOption}
            onClick={() => {
              let options = [...answerOption];
              options.push("Option");
              setAnswerOption(options);
              answerOptions.set(languageOption.value, options);
              updateMap(id, "answerOptions", answerOptions);
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
          onChange={ev => {
            setQuestionText(ev.target.value);
            displayText.set(languageOption.value, ev.target.value);
            updateMap(id, "displayText", displayText);
          }}
          className={styles.questionText}
        />
        <Select
          options={answerTypeOptions}
          onChange={e => {setAnswerType(e); updateMap(id, "answerType", e.value)}}
          defaultValue={typeOfAnswer}
          className={styles.options}
        />
        <Select
          options={languageOptions}
          onChange={e => {
            setLanguage(e);
            changeLanguage(e.value);
            updateMap(id, "language", e.value)}}
          defaultValue={languageOption}
          className={styles.options}
        />
      </div>
      <div className={styles.middlecontainer}>
        <TextareaAutosize
          cacheMeasurements
          value={descriptionText}
          placeholder="Description"
          onChange={(ev) => {
            setDescriptionText(ev.target.value);
            description.set(language, ev.target.value);
            updateMap(id, "description", description)}}
          className={styles.longText}
        />
        <button
         className={styles.saveButton}
        >Save
        </button>
      </div>
      {typeOfAnswer ? getAnswerTypeComponent() : null}
    </div>
  );
};

export default Question;
