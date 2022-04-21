import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
          <div className={styles.form}>
            <form id="login" onSubmit={onSubmit}>
              <div className={styles.input}>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </form>
          </div>
            <Button type="submit" form="login" variant="contained"> Log In </Button>
        </div>
    </div>
  )
}

export default SignUp;