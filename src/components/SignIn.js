import Button from '@material-ui/core/Button'

const SignIn = (props) => {
  console.log('SignIn.js')
  return (
    <div className="sign-in">
      <Button variant="contained" color="secondary" onClick={ props.signInWithGoogle }>
        Sign in with Google
      </Button>
    </div>
  )
}

export default SignIn
