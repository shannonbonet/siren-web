import styles from './styles.module.css'; 
import sirenLogo from '../../../assets/images/siren_logo.png';
import Image from 'next/image'
import { useRouter } from 'next/router';

const Welcome = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className={styles.logo}>
          <Image src={sirenLogo} alt="Siren Logo" width="200%" height="100%"/>
        </div>
        <div className={styles.buttondiv}>
          <button className={styles.login} onClick={() => router.push('/login')}>
            <p className={styles.p1}>Log in</p>
          </button>
          <button className={styles.register} onClick={() => router.push('/register')}>
            <p className={styles.p}>Register</p>
          </button>  
        </div>
      </div>
    </div>
    )
  }
  
  export default Welcome;