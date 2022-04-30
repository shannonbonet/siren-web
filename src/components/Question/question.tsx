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

const Question = () => {
  const [questionText, setQuestionText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [answerType, setAnswerType] = useState(null);
  const [answerOptions, setAnswerOptions] = useState(["Option"]);
  const [required, setRequired] = useState(false);
  const answerTypeOptions = [
    { value: "smallInput", label: "Short answer" },
    { value: "date", label: "Date" },
    { value: "radio", label: "Multiple Choice" },
    { value: "largeInput", label: "Long answer" },
    { value: "checkbox", label: "Checkbox" },
    { value: "dropdown", label: "Dropdown" },
  ];

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
      </div>
      {answerType ? getAnswerTypeComponent() : null}
    </div>
  );
};

export default Question;
