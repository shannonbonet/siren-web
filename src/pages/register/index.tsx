import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import styles from './styles.module.css'; 
import { Button, TextField } from '@material-ui/core';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    // Create a valid password to create user in Firebase
    // Upon success, will redirect to log in page.
    if(checkPassword(passwordOne, passwordTwo))
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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

  return (
    <div className={styles.container}>
        <div className={styles.window}>
          <h1 className={styles.header}>Sign up</h1>
          <div className={styles.form}>
            <form id="register" onSubmit={onSubmit}>
              <div className={styles.input}>
                <TextField label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                <TextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPasswordOne(e.target.value)} />
                <TextField label="Re-enter Password" type="password" variant="outlined" onChange={(e) => setPasswordTwo(e.target.value)} />
              </div>
            </form>
          </div>
          <Button type="submit" form="register" variant="outlined"> Register </Button>
        </div>
    </div>
  )
}

export default SignUp;