import React from 'react'
import Button from '@material-ui/core/Button'
import SignUpForm from './SignUpForm'


const SignUp = (props) => {
  console.log('SignUp.js')
  if (props.user) {
    return (
      <SignUpForm
        user={ props.user }
        users={ props.users }
        database={ props.database }
      />
    )
  } else {
    return (
      <div className="sign-in">
        <Button variant="contained" color="secondary" onClick={ props.signInWithGoogle }>
          Sign Up with Google
          </Button>
      </div>
    )
  }
}

export default SignUp
