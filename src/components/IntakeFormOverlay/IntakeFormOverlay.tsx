import React from 'react';
import Link from 'next/dist/client/link';
import styles from "../IntakeFormOverlay/IntakeFormOverlay.module.css";
import { IoIosArrowBack, IoIosAddCircleOutline } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiUndo, BiRedo } from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import Button from "../Button/Button";
import {LinkForm} from "../LinkForm/LinkForm";


interface OverlayProps {
    title: string;
}

export const IntakeFormOverlay: React.FC<OverlayProps> = ({
  title,
}) => {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["namebar"]}>
        <Link href="/">
          <IoIosArrowBack color="#0F2536"/>
        </Link>
        {title}
      </div>
      <div className={styles["changebar"]}> 
        <IoEyeOutline size={36} />
        <BiUndo size={33}/>
        <BiRedo size={33}/>
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
        <BsThreeDotsVertical size={30}/>
      </div>
      <LinkForm/>
    </div>
    )
}

