import ListItem from '@material-ui/core/ListItem';
import {useRef, useState} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import TimeAgo from 'react-timeago'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Word from './Word'


const TodoItem = (props) => {
  const { 
    title,
    id,
    completed,
    amount,
    owner,
    createdAt,
    read,
    voiceNote,
    mentions,
    ref
  } = props.message;
  const currentLocation = window.location.pathname;
  const userN = `@${props.user.displayName.replace(/ /g, '_')}`


  const handleDeleteItem = () => {
    currentLocation == '/debits' ?
      props.database.collection("debits").doc(id).delete()
      : props.database.collection("TodosTemp").doc(id).delete()
  }

  const handleDeleteVoiceItem = () => {
    props.database.collection("TodosTemp").doc(id).delete();
    props.storage.ref().child(`${ref}`).delete();
  }

  const setComplete = () => {
    currentLocation == '/debits' ?
      props.database.collection("debits").doc(id).update({
        completed: !completed
      })
      : props.database.collection("TodosTemp").doc(id).update({
        completed: !completed
      })
  }

  const handleReadItem = () => {
    if (read.hasOwnProperty(userN)) {
      props.database.collection("TodosTemp").doc(id).update({
        [`read.${userN}`]: !read[userN]
      })
    }
  }


  if (voiceNote){
    return (
      <>
        <ListItem
          style={ { padding: '0px 0px 0px 15px' } }
        >
          <ListItemIcon style={ { minWidth: '20px' } }>
            <Checkbox
              edge="start"
              color="primary"
              checked={ completed }
              onChange={ setComplete }
            />
          </ListItemIcon>
          <ListItemText onClick={read? handleReadItem : null}>
            <h5 style={{margin: '0', fontWeight: 'normal'}}>
              {mentions.length < 5 ? mentions.map(u => 
                <span key={u} style={ { color: '#bf00ff' } }>
                  {' '}{ u.replace(/_/g, ' ') }
                </span>
              ) : null}
            </h5>
              {read ?
                (read.hasOwnProperty(userN) ?
                  (!read[userN] ?
                      <span style={{marginRight:'20px'}} className="tablet">new</span>
                  : null)
                : null)
              : null}
            <audio controls src={voiceNote}></audio>
            <div style={{display:"flex"}}>
              {read ? (Object.keys(read).every((k) => read[k]) ?
                    <DoneAllIcon style={{color: '#1B9EC8', fontSize: 'medium', marginRight: '5px' }}/> 
                  : null) : null}
              <h6 style={ { margin: '0px', color: '#1B9EC8'} }>‎‎by:  { owner }</h6>
              <h6 style={ {paddingLeft: "15px", margin: '0px', color: '#1B9EC8' } }>
                <TimeAgo date={createdAt? createdAt.toDate() : new Date()} />
              </h6>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={ handleDeleteVoiceItem } >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    )
  } else {
    return (
      <>
        <ListItem
          style={ { padding: '0px 0px 0px 15px' } }
        >
          <ListItemIcon style={ { minWidth: '20px' } }>
            <Checkbox
              edge="start"
              color="primary"
              checked={ completed }
              onChange={ setComplete }
            />
          </ListItemIcon>
          <ListItemText onClick={read? handleReadItem : null}>
            {read ? (read.hasOwnProperty(userN) ? (!read[userN] ? <span className="tablet">new</span> : null): null) : null }
            { amount ? <span className="amount">{ amount }</span> : null }
            { title.split(' ').map((word, index) => <Word key={index} word={ word } />) }
            <div style={{display:"flex"}}>
              {read ? (Object.keys(read).every((k) => read[k]) ?
                    <DoneAllIcon style={{color: '#1B9EC8', fontSize: 'medium', marginRight: '5px' }}/> 
                  : null) : null}
              <h6 style={ { margin: '0px', color: '#1B9EC8'} }>‎‎by:  { owner }</h6>
              <h6 style={ {paddingLeft: "15px", margin: '0px', color: '#1B9EC8' } }>
                <TimeAgo date={createdAt? createdAt.toDate() : new Date()} />
              </h6>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={ handleDeleteItem } >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    )
  }
}

export default TodoItem
