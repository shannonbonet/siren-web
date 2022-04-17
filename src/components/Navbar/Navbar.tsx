import Link from 'next/link'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router';
import { FiExternalLink} from "react-icons/fi";
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';

export const Navbar = () => {   
    const router = useRouter();
    const { signOut } = useAuth(); 
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
            <Link href="/settings">
                <a className={router.pathname == "/settings" ? styles.active : ""}> 
                    <Avatar sx={{ width: 28, height: 28 }}>TBD</Avatar>
                </a>
            </Link>
        </nav>
    )
}