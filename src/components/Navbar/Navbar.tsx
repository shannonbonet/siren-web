import Link from 'next/link'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router';
import { FiExternalLink} from "react-icons/fi";
import { CgProfile} from "react-icons/cg";


export const Navbar = () => {   
    const router = useRouter();
    return (
        <nav className={styles.bar}>
            <Link href="/" >
                <a className={router.pathname == "/" ? styles.active : ""}> 
                    Intake Dashboard
                </a>
            </Link>
            <Link href="/IntakeForms" >
                <a className={router.pathname == "/IntakeForms" ? styles.active : ""}> 
                    Intake Form
                </a>
            </Link>
            <Link href="/calendar">
                <a className={router.pathname == "/calendar" ? styles.active : ""}> 
                    Calendly <FiExternalLink stroke="white" size={15}/>
                </a>
            </Link>
            <CgProfile style={{fill: 'white'}} size={25}/>
        </nav>
    )
}