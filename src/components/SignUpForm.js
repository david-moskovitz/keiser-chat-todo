import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HomePage from './HomePage/HomePage'


const SignUpForm = (props) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    props.database.collection("UserTemp").doc(props.user.uid).set({
      email: props.user.email,
      name: props.user.displayName,
      photoURL: props.user.photoURL,
    }).then(() => setOpen(true))
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const usersIds = props.users ? Array.from(props.users, i => i.id) : []
  console.log('SignUpForm.js')
  return (
    <div>
      <Snackbar
        anchorOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        } }
        open={ open }
        autoHideDuration={ 6000 }
        onClose={ handleClose }
        message="Congratulations! Your User Info Has Been Saved."
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={ handleClose }>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <br />
      <br />
      <br />
      {props.users && usersIds.includes(props.user.uid) ?
        <HomePage
          signInWithGoogle={ props.signInWithGoogle }
          user={ props.user }
        />
        :
        <>
          <h1 style={ { textAlign: 'center' } }>We are setting up your account...</h1>
          <h3 style={ { textAlign: 'center' } }>It will be ready shortly</h3>
        </>
      }
    </div>
  )
}


export default SignUpForm
