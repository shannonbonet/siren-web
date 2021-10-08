import Link from 'next/link'
import styles from './Navbar.module.css'

export const Navbar = () => {   
    return (
        <nav className={styles.bar}>
            <Link href="/intake-dashboard">
                <a>Intake Dashboard</a>
            </Link>
        
            <Link href="/calendar">
                <a>Calendar</a>
            </Link>
        </nav>
    )
}