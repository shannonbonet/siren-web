import React from 'react';
import Link from 'next/dist/client/link';
import styles from "../IntakeFormOverlay/IntakeFormOverlay.module.css";
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiUndo, BiRedo } from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import Button from "../Button/Button";


interface OverlayProps {
    title: string;
    caseType: string;
}

const IntakeFormOverlay: React.FC<OverlayProps> = ({
  title,
  caseType
}) => {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["namebar"]}>
        <Link href="/">
          <IoIosArrowBack color="#0F2536"/>
        </Link>
        {/* <p className={styles["title"]}>
          {title}
        </p> */}
        {title}
      </div>
      <div className={styles["changebar"]}> 
        <IoEyeOutline size={36}/>
        <BiUndo size={32}/>
        <BiRedo size={32}/>
        <IoIosAddCircleOutline size={33}/>
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
        <BsThreeDotsVertical/>
      </div>
      <div className={styles["link-form"]}>
        <p className={styles["link-text"]}>Link to </p>
        <select name="casetype" id={styles["case-type"]}>
          <option value={caseType}>{caseType}</option>
        </select>
      </div>
    </div>
    )
}

export default IntakeFormOverlay;
