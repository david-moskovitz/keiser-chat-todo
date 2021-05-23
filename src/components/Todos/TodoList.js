import { useState, useRef, useEffect } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TodoItem from './TodoItem'

const TodoList = (props) => {
  const [showCompleted, setShowCompleted] = useState(false)
  
  const openCompleted = () => {
    setShowCompleted(!showCompleted)
  }

  const scroll = useRef()

  useEffect(() => {
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }, [props.todos])

  return (
    <div className="todo-list">
      <List className="todo-list-list">
        { props.todos &&
          props.todos
            .filter(todo => !todo.completed)
            .map(todo =>
              <TodoItem
                key={ todo.id }
                message={ todo }
                user={props.user}
                users={props.users}
                database={ props.database }
                storage={ props.storage }
              />) }
        <ListItem
          button
          onClick={ openCompleted }
          className="open-completed"
          ref={scroll}
        >
          <Divider />
          { !showCompleted ?
            <ExpandMoreIcon style={ { color: '#858585' } } />
            : <ExpandLessIcon style={ { color: '#858585' } } /> }
          <ListItemText style={ { color: '#858585' } }>
            <b>{ props.todos.filter(todo => todo.completed).length } Item Completed</b>
          </ListItemText>
        </ListItem>
        <Divider />
        { showCompleted ? props.todos &&
          props.todos
            .filter(todo => todo.completed)
            .map(todo =>
              <TodoItem
                key={ todo.id }
                message={ todo }
                user={props.user}
                users={props.users}
                storage={ props.storage }
                database={ props.database }
              />) : null }
      </List>
    </div>
  )
}

export default TodoList
