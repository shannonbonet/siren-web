import styles from './styles.module.css'; 
import sirenLogo from '../../../assets/images/siren_logo.png';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';


const Welcome = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className={styles.logo}>
          <Image src={sirenLogo} alt="Siren Logo" width="200%" height="100%"/>
        </div>
        <div className={styles.buttondiv}>
          <Button className={styles.login} onClick={() => router.push('/login')} variant="outlined">
            Log In 
          </Button>
          <Button className={styles.register} onClick={() => router.push('/register')} variant="contained">
            <p className={styles.p}>Register</p>
          </Button>
        </div>
      </div>
    </div>
    )
  }
  
  export default Welcome;