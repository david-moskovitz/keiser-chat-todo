import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from '../Form'
import VoiceForm from '../VoiceForm'
import Progress from '../Todos/Progress'
import TodoList from '../Todos/TodoList'
import SignIn from '../SignIn'


const TodosPage = (props) => {

  
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [isVoice, setIsVoice] = useState(false)

  useEffect(() => {
    props.database.collection("TodosTemp")
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const newTodo = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTodos(newTodo)
      })
  }, [])


  useEffect(() => {
    if (todos.length > 0) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [todos])

  if (props.user) {
    return (
      <div>
        { isLoading ?
          <div className="full-center"><CircularProgress color="secondary" /></div>
          :
          <>
            <Progress database={props.database} user={props.user}/>
            <TodoList users={props.users} todos={ todos } user={ props.user } database={ props.database } storage={ props.storage }/>
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

export default TodosPage
