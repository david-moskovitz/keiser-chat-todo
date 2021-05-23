import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from '../Form'
import VoiceForm from '../VoiceForm'
import Progress from '../Todos/Progress'
import TodoList from '../Todos/TodoList'
import SignIn from '../SignIn'

const FeedPage = (props) => {

  const [loading, setLoading] = useState(true)
  const [feeds, setFeeds] = useState([])
  const [isVoice, setIsVoice] = useState(false)


  useEffect(() => {
    props.database.collection("TodosTemp")
      .where("mentions", "array-contains", `@${props.user.displayName.replace(/ /g, '_')}`)
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const newFeed = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setFeeds(newFeed)
      })
  }, [])

  useEffect(() => {
    if (feeds.length > 0) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [feeds])


  if (props.user) {
    return (
      <div>
        { loading ?
          <div className="full-center"><CircularProgress color="secondary" /></div>
          :
          <>
            <Progress database={props.database} user={props.user}/>
            <TodoList users={props.users} todos={ feeds } user={ props.user } database={ props.database } storage={ props.storage } />
          </>
        }
        {isVoice ? 
          <VoiceForm
            user={ props.user }
            setIsVoice={setIsVoice}
            database={ props.database }
            users={ props.users }
            firebase={ props.firebase }
            storage={props.storage}
          /> 
        :
          <Form
            user={ props.user }
            setIsVoice={setIsVoice}
            database={ props.database }
            users={ props.users }
            firebase={ props.firebase }
          />
        }
      </div>
    )
  } else {
    return <SignIn signInWithGoogle={ props.signInWithGoogle } />
  }
}

export default FeedPage

