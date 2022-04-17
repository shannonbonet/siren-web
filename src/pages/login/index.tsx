import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import styles from './styles.module.css'; 


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      router.push('/');
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
        <div className={styles.window}>
          <h1 className={styles.header}>Log in</h1>
          <div className={styles.formdiv}>
            <form id="login" onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Email</span>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
              </div>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Password</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className={styles.input}/>
              </div>
            </form>
            <div className={styles.login}>
              <button className={styles.button} type="submit" form="login">
                <p className={styles.h3}>Log in</p>
              </button> 
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp;