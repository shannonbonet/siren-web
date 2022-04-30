import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/auth/useFirebaseAuth';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import styles from './styles.module.css'; 
import { FormControl, InputLabel, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { SirenUser } from '../../../types';
import { getSirenUser, setSirenUser } from '../../firebase/queries';


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 
  const [approvalOpen, setApprovalOpen] = useState(false); 
  const [deniedOpen, setDeniedOpen] = useState(false); 
  const [user, setUser] = useState(null); 

  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    signInWithEmailAndPassword(email, password)
    .then(async authUser => {
      const sirenUser: SirenUser = await getSirenUser(authUser.user.uid)
      setUser(sirenUser);
      if (sirenUser.status == "Approved") {
        router.push('/');
      } else if (sirenUser.status === "Pending") {
        setApprovalOpen(true);
      } else {
        setDeniedOpen(true);
      }
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

  const handleClose = () => {
    setApprovalOpen(false);
    setDeniedOpen(false);
  }

  const handleRequestAccess = () => {
    const updatedUser = {...user};
    updatedUser.status = "Pending";
    setUser(updatedUser);
    setSirenUser(updatedUser);
    handleClose();
  }

  const getApprovalDialog = () => {
    return (
      <Dialog
      open={approvalOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Approval Status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have not been approved yet. Contact a SIREN Administrator to get approved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const getDeniedDialog = () => {
    return (
      <Dialog
      open={deniedOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Approval Status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have been denied for an account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestAccess}>Request Access</Button>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    )
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
            {getApprovalDialog()}
            {getDeniedDialog()}
        </div>
            <Button type="submit" form="login" variant="contained"> Log In </Button>
        </div>
    </div>
  )
}

export default LogIn;