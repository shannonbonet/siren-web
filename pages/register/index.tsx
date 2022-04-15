import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import styles from './styles.module.css'; 


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if(passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        router.push("/login");
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
        <div className={styles.window}>
          <h1 className={styles.header}>Sign up</h1>
          <div className={styles.formdiv}>
            <form id="register" onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Name</span>
                <input type="text" onChange={(e) => setName(e.target.value)} className={styles.input}/>
              </div>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Email</span>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
              </div>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Password</span>
                <input type="password" onChange={(e) => setPasswordOne(e.target.value)} className={styles.input}/>
              </div>
              <div className={styles.inputdiv}>
                <span className={styles.span}>Re-enter password</span>
                <input type="password" onChange={(e) => setPasswordTwo(e.target.value)} className={styles.input}/>
              </div>
            </form>
            <div className={styles.register}>
              <button className={styles.button} type="submit" form="register">
                <p className={styles.h3}>Register</p>
              </button> 
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp;