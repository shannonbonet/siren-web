import React from 'react';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import { Avatar } from '@mui/material';
import styles from "../NavBar/NavBar.module.css";
import { FiExternalLink} from "react-icons/fi";
import { CgProfile} from "react-icons/cg";



const NavBar = () => {

  const router = useRouter();
    return (
      <div className={styles["head-container"]}>
        <nav className={styles["nav-links"]}>
          <Link href="/">
            <a className={styles["link"]}>Intake Dashboard</a>
          </Link>
          <Link href="/IntakeForms" >
            <a className={styles["link"]}>Intake Form</a>
          </Link>
          <Link href="/Calendar">
            <a className={styles["link"]}>
              Calendly <FiExternalLink stroke="white" size={15}/> </a>
          </Link>
          <CgProfile style={{fill: 'white'}} size={25}/>

        </nav>
      </div>
      );
    }

    export default NavBar;