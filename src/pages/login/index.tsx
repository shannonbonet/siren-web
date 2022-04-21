import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles.module.css'; 
import { FormControl, InputLabel, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 

  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      router.push('/');
    })
    .catch(error => {
      console.log(error)
      alert(error)
    });
    event.preventDefault();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword); 
  }

  return (
    <div className={styles.container}>
        <div className={styles.window}>
          <h1 className={styles.header}>Log in</h1>
          <div className={styles.form}>
            <form id="login" onSubmit={onSubmit}>
              <div className={styles.input}>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    label="Password"
                  />
                </FormControl>
              </div>
            </form>
          </div>
            <Button type="submit" form="login" variant="contained"> Log In </Button>
        </div>
    </div>
  )
}

export default SignUp;