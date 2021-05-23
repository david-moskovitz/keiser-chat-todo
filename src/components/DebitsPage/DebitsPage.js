import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import TodoList from '../Todos/TodoList'
import SignIn from '../SignIn'

const DebitsPage = (props) => {

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [debits, setDebits] = useState([])

  useEffect(() => {
    props.database.collection("debits")
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const newDebit = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setDebits(newDebit)
      })
  }, [])


  useEffect(() => {
    if (debits.length > 0) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [debits])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      title: title,
      amount: amount,
      completed: false,
      owner: `@${props.user.displayName}`,
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
    };
    props.database.collection("debits").add(newDebit)
    setTitle('')
    setAmount('')
  }

  return (
    <div>
      { loading ?
        <div className="full-center"><CircularProgress color="secondary" /></div>
        :
        <TodoList todos={ debits } user={ props.user } database={ props.database } />
      }
      <div className="form-paper-div-1">
        <Paper square className="form-paper">
          <form className="form-d" onSubmit={ handleFormSubmit }>
            <div className="title-input">
              <InputBase
                required
                fullWidth
                value={ title }
                placeholder="name"
                onChange={ e => setTitle(e.target.value) }
              />
              <hr style={ { borderColor: '#1B9EC8', margin: '0px' } } />
              <InputBase
                required
                fullWidth
                type="number"
                value={ amount }
                placeholder="amount..."
                onChange={ e => setAmount(e.target.value) }
              />
            </div>
            <Button type="submit" color="primary" className="send-button">
              <SendIcon />
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  )
}

export default DebitsPage
