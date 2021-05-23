import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TodayIcon from '@material-ui/icons/Today';






const WorkSearch = (props) => {

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [days, setDays] = useState([]);
  const [showSearch, setShowSearch] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const search = () => {
    setIsLoading(true)
    setShowSearch(false)
    setDays([])
    props.database.collection("work")
      .where("name", "==", name)
      .where("date", ">=", fromDate)
      .where("date", "<=", toDate)
      .get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          setDays(oldDays => [...oldDays, doc.data()])
        })
        setIsLoading(false)
      })
  }
  const allHours = () => {
    const times = Array.from(days, d => d.addUp)
    
    const totalMinutes = times.reduce((sum, time) => {
      let [hours, mins] = time.split(':');
      sum += hours * 60 + mins * 1;
      
      return sum;
    }, 0);
    const h = parseInt(`${totalMinutes / 60}`)
    const mRef = Math.ceil(totalMinutes / 60 % 1 * 60)
    const m = mRef < 10 ? `0${mRef}` : mRef
    return parseFloat(`${h}.${m}`)
  }

  const openSearch = () => {
    setShowSearch(!showSearch)
  }

  const { users } = props;
  if (users == undefined) {
    return null;
  } else {
    return (
      <div className="work-search-container">
        <div onClick={ openSearch } className="open-search" ><b>search</b></div>
        {showSearch ?
          <>
            <br />
            <div className="inner-container">
              <span className="text-h1">Name</span>
              <FormControl variant="outlined" color="secondary" size="small" className="name-input-work">
                <Select value={ name } onChange={ e => setName(e.target.value) }>
                  { users.map(user => <MenuItem value={ user.name }>{ user.name }</MenuItem>) }
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="inner-inner-container">
              <span className="text-h1">From</span>
              <TextField
                //className="text-input"
                size="small"
                color="secondary"
                type="date"
                value={ fromDate }
                onChange={ (e) => setFromDate(e.target.value) }
                variant="outlined"
              />
            </div>
            <br />
            <div className="inner-inner-container">
              <span className="text-h1">To</span>
              <TextField
                className="text-input"
                size="small"
                color="secondary"
                type="date"
                value={ toDate }
                onChange={ (e) => setToDate(e.target.value) }
                variant="outlined"
              />
            </div>
            <br />
            <div className="inner-inner-container">
              <Button
                onClick={ search }
                variant="contained"
                color="secondary"
              >Search</Button>
            </div>
          </>
          : null
        }
        <div className="loader">
          { isLoading ? <CircularProgress /> : null }
        </div>
        { days.length >= 1 ?
          <div className="card" onClick={ e => setShowDetails(!showDetails) }>Total: <b>{ allHours() }</b> hours</div>
          : null }
        { showDetails ?
          <div className="cards">
            <List>
              { days.map((day) => <><ListItem key={day.date}>
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <ListItemText>
                  <span className="text-h3">{ day.date }</span>
                  { day.addUp }
                </ListItemText>
              </ListItem><Divider /></>) }
            </List>
          </div>
          : null }
      </div>
    )
  }
}

export default WorkSearch
