import Link from 'next/link'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router';

export const Navbar = () => {   
    const router = useRouter();
    return (
        <nav className={styles.bar}>
            <Link href="/" >
                <a className={router.pathname == "/" ? styles.active : ""}> 
                    Intake Dashboard
                </a>
            </Link>
        
            <Link href="/calendar">
                <a className={router.pathname == "/calendar" ? styles.active : ""}> 
                    Calendar
                </a>
            </Link>
        </nav>
    )
}