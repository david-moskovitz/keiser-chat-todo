import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';
import MenuSideBar from './MenuSideBar'
import logo from '../keiser_logo.jpg'


// styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))

// main component
const Header = (props) => {

  const classes = useStyles(); // get classes styles
  const [openSideMenu, setOpenSideMenu] = useState(false); // state for open/close side menu
  const [openOptions, setOpenOptions] = useState(false); // state for open/close sign in/out menu

  // open option on click
  const handleOpenOptions = (e) => {
    setOpenOptions(!openOptions)
  }
  // closes options when click away
  const handleClickAwayOptions = (e) => {
    setOpenOptions(false)
  }
  // sign out
  const handleSignOut = (e) => {
    props.auth.signOut()
    setOpenOptions(false)
  }
  // change user
  const changeUserClick = () => {
    props.signInWithGoogle()
    setOpenOptions(false)
  }

  const handleOpenSideMenu = () => {
    setOpenSideMenu(!openSideMenu)
  }

  const handleClickAwayMenu = () => {
    setOpenSideMenu(false)
  }

  return (
    <>
      <div className="header">
        <AppBar position="fixed" className={ classes.appBar }>
          <Toolbar>
            <div>
              <ClickAwayListener onClickAway={ handleClickAwayMenu }>
                <IconButton edge="start" color="inherit" onClick={ handleOpenSideMenu }>
                  <img src={ logo } className="logo" />
                </IconButton>
              </ClickAwayListener>
            </div>
            <div className="header-middle" />
            { props.user ?
              <div>
                <ClickAwayListener onClickAway={ handleClickAwayOptions }>
                  <IconButton color="inherit" onClick={ handleOpenOptions } ><Avatar alt={ props.user.displayName.charAt(0) } src={ props.user.photoURL } /></IconButton>
                </ClickAwayListener>
              </div> : <div /> }
          </Toolbar>
        </AppBar>
      </div>
      {openOptions ? <div className="options-popup">
        <div className="user-info">
          <Avatar alt={ props.user.displayName.charAt(0) } src={ props.user.photoURL } style={ { height: '60px', width: '60px' } } />
          <p style={ { margin: '5px' } }>‎Hi <b>{ props.user.displayName.replace(/ .*/, '') }</b></p>
          <p style={ { fontSize: '12px', margin: '1px' } }>{ props.user.email }</p>
        </div>
        <List>

          <Divider />
          <ListItem button onClick={ handleSignOut }>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>
              ‎sign out
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={ changeUserClick }>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>
              ‎change user
            </ListItemText>
          </ListItem>
        </List>
      </div> : <div /> }
      <MenuSideBar openSideMenu={ openSideMenu } />
      <div style={ { height: '67px' } } />
    </>
  )
}

export default Header
