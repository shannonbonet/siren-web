import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

export const Navbar = () => {   
    return (
        <nav>
            <div className={styles.bar}>
                <Link href="/intake-dashboard">
                    <a>Intake Dashboard</a>
                </Link>
            </div>
        
            <div className={styles.bar}>
                <Link href="/calendar">
                    <a>Calendar</a>
                </Link>
            </div>
        </nav>
    )
}