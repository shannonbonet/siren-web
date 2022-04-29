import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import styles from './styles.module.css'; 
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { setSirenUser } from '../../firebase/queries';
import { SirenUser } from '../../../types';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassOne, setShowOne] = useState(false); 
  const [showPassTwo, setShowTwo] = useState(false); 
  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    // Create a valid password to create user in Firebase
    // Upon success, will redirect to log in page.
    if(checkPassword(passwordOne, passwordTwo))
      createUserWithEmailAndPassword(email, passwordOne)
      .then(async authUser => {
        console.log(authUser.user)
        const newUser: SirenUser = {
          uid: authUser.user.uid,
          name: name,
          email: email,
          role: "Viewer",
          isApproved: false,
        }
        await setSirenUser(newUser);
        router.push("/login");
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        alert(error)
        console.log(error)
      });
    event.preventDefault();
  };


function checkPassword (password: string, password2: string): boolean {
  var hasLower = new RegExp("^(?=.*[a-z])"); 
  var hasUpper = new RegExp("^(?=.*[A-Z])"); 
  var hasNum = new RegExp("^(?=.*[0-9])"); 
  
  if (password !== password2) {
    alert("Passwords do not match")
  } else if (password.length < 6) {
      alert("Password must be greater than 6 characters")
      return false
  } else {
      if (hasLower.test(password) === false) {
        alert("Password must contain lower case character")
        return false
      } 
      if (hasUpper.test(password) === false) {
        alert("Password must contain upper case character")
        return false
      } 
      if (hasNum.test(password) === false) {
        alert("Password must contain number")
        return false
      } 
    }
    return password === password2; 
  }

  const toggleFirstPassword = () => {
    setShowOne(!showPassOne); 
  }
  const toggleSecondPassword = () => {
    setShowTwo(!showPassTwo); 
  }

  return (
    <div className={styles.container}>
        <div className={styles.window}>
          <h1 className={styles.header}>Sign Up</h1>
          <div className={styles.form}>
            <form id="register" onSubmit={onSubmit}>
              <div className={styles.input}>
                <TextField label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                <TextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                {/* Not sure how to fix 'no overloads match this call' error for FormControl but it works on my end
                Without FormControl, the InputLabel doesn't format nicely */}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassOne ? 'text' : 'password'}
                      onChange={(e) => setPasswordOne(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleFirstPassword}
                            edge="end"
                          >
                            {showPassOne ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    label="Password"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassTwo ? 'text' : 'password'}
                      onChange={(e) => setPasswordTwo(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleSecondPassword}
                            edge="end"
                          >
                            {showPassTwo ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    label="Password"
                  />
                </FormControl>
              </div>
            </form>
          </div>
          <Button type="submit" form="register" variant="outlined"> Register </Button>
        </div>
    </div>
  )
}

export default SignUp;