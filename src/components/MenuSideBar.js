import { useHistory } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { lighten, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';



const useStyles = makeStyles((theme) => ({
  light: {
    backgroundColor: lighten(theme.palette.primary.light, 0.65),
  }
}))


const MenuSideBar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const currentLocation = window.location.pathname;
  
  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={ props.openSideMenu }
    >
      <div style={ { height: '60px' } } />
      <List>
        <ListItem
          button
          className={ currentLocation == '/feed' ? classes.light : '' }
          onClick={ () => history.push('/feed') }
        >
          <ListItemIcon>
            <AlternateEmailIcon />
          </ListItemIcon>
          <ListItemText>
            Feed
          </ListItemText>
        </ListItem>
        <ListItem
          button
          className={ currentLocation == '/todos' ? classes.light : '' }
          onClick={ () => history.push('/todos') }
        >
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText>
            all todos
          </ListItemText>
        </ListItem>
        <ListItem
          button
          className={ currentLocation == '/debits' ? classes.light : '' }
          onClick={ () => history.push('/debits') }
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText>
            debits
          </ListItemText>
        </ListItem>
        <ListItem
          button
          className={ currentLocation == '/work' ? classes.light : '' }
          onClick={ () => history.push('/work') }
        >
          <ListItemIcon>
            <TimelapseIcon />
          </ListItemIcon>
          <ListItemText>
            hours
          </ListItemText>
        </ListItem>
        <ListItem
          button
          className={ currentLocation == '/goal' ? classes.light : '' }
          onClick={ () => history.push('/goal') }
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText>
            edit goal
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MenuSideBar
