import React from 'react';
import styles from "../IntakeFormOverlay.module.css";
import Link from 'next/dist/client/link';
import { IoChevronBackSharp } from "react-icons/io";


interface OverlayProps {
    title: string;
}

const IntakeFormOverlay: React.FC<OverlayProps> = ({
  title
}) => {
  return (
    <div className={styles["header"]}>
      <div>
        <Link href="/">
          <IoChevronBackSharp color="#0F2536"/>
        </Link>
        <p className={styles["title"]}>
          {title}
        </p>
      </div>
        <p className={styles["title"]}>
          {title}
        </p>
    </div>
    )
}
