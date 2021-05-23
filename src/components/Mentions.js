import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));


const Mentions = (props) => {

  const classes = useStyles();
  return (
    <div className="mentions">
      <List dense>
        { props.users.map(user => (
          <div key={ user.name }>
            <ListItem button onClick={ e => props.handleUserClick(user) }>
              <ListItemIcon>
                <Avatar alt={ user.name.charAt(0) } src={ user.photoURL } className={ classes.small } />
              </ListItemIcon>
              <ListItemText>
                { user.name }
              </ListItemText>
            </ListItem>
            <Divider />
          </div>
        )) }
      </List>
    </div>
  )
}

export default Mentions
