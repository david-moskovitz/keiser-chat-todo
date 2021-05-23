import React, {useEffect, useState, useRef} from 'react'
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Mentions from '../components/Mentions'

const Form = (props) => {
  const [title, setTitle] = useState('')
  const [isTypingName, setIsTypingName] = useState(false)
  const formR = useRef(0)

  useEffect(() => {
    if (title.endsWith(' @') || title === '@') {
      setIsTypingName(true)
    } else {
      setIsTypingName(false)
    }
  }, [title])

  const handleFormChange = (e) => {
    setTitle(e.target.value)
  }

  const handleUserClick = (user) => {
    const noSpaceUser = user.name.replace(/ /g, '_')
    setTitle(`${title}${noSpaceUser} `)
    formR.current.focus()
  }


  const handleFormSubmit = (e) => {
    e.preventDefault()
    const regex = /([@][\u0590-\u05FF\uFB1D-\uFB4F\_]+)|([@][A-z]\w+)/g
    const hasMentions = title.match(regex) ?
      title.match(regex)
      : Array.from(
          props.users,
          d => `@${d.name.replace(/ /g, '_')}`
        );
    const hasMentionsNotUser = hasMentions.filter(u => u !== `@${props.user.displayName.replace(/ /g, '_')}` )
    const read = {}
    hasMentionsNotUser.forEach(u => {
      read[u]= false
    })
    const newTodo = {
      title: title,
      completed: false,
      mentions: hasMentions,
      read,
      owner: `@${props.user.displayName}`,
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
    }
   
    props.database.collection("TodosTemp").add(newTodo)
    setTitle('')
  }

  return (
    <>
    <div className="form-paper-div" style={{ display: 'flex'}}>
      <form className="form" onSubmit={ handleFormSubmit }>
        <Paper square className="form-paper">
          <div className="title-input">
            <InputBase
              required
              fullWidth
              inputRef={formR}
              value={ title }
              placeholder="start typing... or type @ to mention a name"
              onChange={ handleFormChange }
            />
          </div>
        </Paper>
        <button type="submit" className="send-button">
          <SendIcon />
        </button>
        <button onClick={e => props.setIsVoice(true)} className="send-button">
          <KeyboardVoiceIcon />
        </button>
      </form>
    </div>
    { isTypingName ?
      <Mentions
        handleUserClick={ handleUserClick }
        users={ props.users }
      />
      : <div /> }
    </>
  )
}

export default Form
