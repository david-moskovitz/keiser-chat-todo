import React, { useEffect, useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import theme from './theme';
import Header from './components/Header'
import SignUp from './components/SignUp'
import EditGoal from './components/EditGoal'
import HomePage from './components/HomePage/HomePage'
import FeedPage from './components/FeedPage/FeedPage'
import TodosPage from './components/TodosPage/TodosPage'
import WorkPage from './components/WorkPage/WorkPage'
import DebitsPage from './components/DebitsPage/DebitsPage'



import VoiceRecorder from './components/VoiceRecorder';



// firebase config
const config = {
  
}

// initialize config 
try {
  firebase.initializeApp(config)
} catch (err) {
  console.log(err)
}

const database = firebase.firestore(); // database
const storage = firebase.storage(); // storage
const auth = firebase.auth()

// sign in with google
const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function App() {

  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([])
  // get users
  useEffect(() => {
    database.collection("users")
      .onSnapshot(snapshot => {
        const newUser = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setUsers(newUser)
      })
      
  }, [user])
  
  return (
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <Route exact path="/" >
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }
          />
          <HomePage
            signInWithGoogle={ signInWithGoogle }
            user={ user }
          />
        </Route>
        <Route exact path="/feed">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }

          />
          { !loading ?
            <FeedPage
              user={ user }
              database={ database }
              users={ users }
              storage={storage}
              firebase={ firebase }
              signInWithGoogle={ signInWithGoogle }
            /> : null
          }
        </Route>
        <Route exact path="/todos">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }

          />
          <TodosPage
            user={ user }
            database={ database }
            users={ users }
            storage={storage}
            firebase={ firebase }
            signInWithGoogle={ signInWithGoogle }
          />
        </Route>
        <Route exact path="/debits">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }
          />
          <DebitsPage
            user={ user }
            database={ database }
            users={ users }
            firebase={ firebase }
            signInWithGoogle={ signInWithGoogle }
          />
        </Route>
        <Route exact path="/work">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }
          />
          <WorkPage
            user={ user }
            database={ database }
            users={ users }
            signInWithGoogle={ signInWithGoogle }
          />
        </Route>
        <Route exact path="/signup">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }
          />
          <SignUp
            user={ user }
            users={ users }
            database={ database }
            signInWithGoogle={ signInWithGoogle }
          />
        </Route>
        <Route exact path="/goal">
          <Header
            user={ user }
            auth={ auth }
            signInWithGoogle={ signInWithGoogle }
          />
          <EditGoal
            user={ user }
            users={ users }
            database={ database }
            signInWithGoogle={ signInWithGoogle }
          />
        </Route>
        <Route exact path="/re">
          <VoiceRecorder
            user={ user }
            users={ users }
            database={ database }
            storage={storage}
            firebase={ firebase }
          />
        </Route>
      </BrowserRouter>

    </ThemeProvider>
  )
}
export default App;
