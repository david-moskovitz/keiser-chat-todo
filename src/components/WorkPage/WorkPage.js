import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import WorkSearch from './WorkSearch'
import SignIn from '../SignIn'



const WorkPage = (props) => {
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
  const [timeIn, setTimeIn] = useState('')
  const [timeOut, setTimeOut] = useState('')
  const [timeIn2, setTimeIn2] = useState('')
  const [timeOut2, setTimeOut2] = useState('')
  const [showSecondTime, setShowSecondTime] = useState(false)

  const timeNow = (time) => {
    var now = new Date(),
      h = (now.getHours() < 10 ? '0' : '') + now.getHours(),
      m = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    time(h + ':' + m)
  }


  const save = () => {
    const newDay = {
      name: props.user.displayName,
      date: date,
      timeIn: timeIn,
      addUp: '00:00'
    }
    props.database.collection("work")
      .doc(`${props.user.displayName}_${date}`)
      .set(newDay)
    setTimeIn('')
  }

  const saveSecond = () => {
    props.database.collection("work")
      .doc(`${props.user.displayName}_${date}`)
      .update({
        timeIn2,
        second: true
      })
    setTimeIn2('')
  }
  const saveDay = () => {
    props.database.collection("work")
      .doc(`${props.user.displayName}_${date}`).get().then(doc => {
        const getDate = doc.data()
        // from stack overflow i think i understand it enough
        // counts amount of hours from in to out
        const ary1 = getDate.timeIn.split(':');
        const ary2 = timeOut.split(':');
        const minDiff = parseInt(ary2[0], 10)
          * 60 + parseInt(ary2[1], 10)
          - parseInt(ary1[0], 10)
          * 60 - parseInt(ary1[1], 10);
        const timeDiff = String(100 + Math.floor(minDiff / 60)).substr(1) + ':' + String(100 + minDiff % 60).substr(1);

        props.database.collection("work")
          .doc(`${props.user.displayName}_${date}`)
          .update({
            timeOut: timeOut,
            addUp: timeDiff
          })
        setDate(new Date().toJSON().slice(0, 10))
        setTimeIn('')
        setTimeOut('')
      })
  }

  const saveDaySecond = () => {
    props.database.collection("work")
      .doc(`${props.user.displayName}_${date}`).get().then(doc => {
        const getDate = doc.data()
        
        props.database.collection("workBackUp")
            .doc(`${props.user.displayName}_${date}.copy`)
            .set(getDate)

        if (getDate.second) {
          // from stack overflow i think i understand it enough
          // counts amount of hours from in to out
          const ary1 = getDate.timeIn2.split(':');
          const ary2 = timeOut2.split(':');
          const minDiff = parseInt(ary2[0], 10)
            * 60 + parseInt(ary2[1], 10)
            - parseInt(ary1[0], 10)
            * 60 - parseInt(ary1[1], 10);
          const timeDiff = String(100 + Math.floor(minDiff / 60)).substr(1) + ':' + String(100 + minDiff % 60).substr(1);

          const timeArray = [getDate.addUp, timeDiff]

          const totalMinutes = timeArray.reduce((sum, time) => {
            let [hours, mins] = time.split(':');
            sum += hours * 60 + mins * 1;
            
            return sum;
          }, 0);
          const h = parseInt(`${totalMinutes / 60}`)
          const mRef = Math.ceil(totalMinutes / 60 % 1 * 60)
          const m = mRef < 10 ? `0${mRef}` : mRef
          const addUpAll =  `${h}:${m}`;

          props.database.collection("work")
            .doc(`${props.user.displayName}_${date}`)
            .update({
              timeOut2,
              prevAddUp: getDate.addUp,
              addUp: addUpAll
            })
          setTimeIn2('')
          setTimeOut2('')
        }
      })
  }


  if (props.user) {
    return (
      <div className="work-page">
        <div className="work-page-container">
          <div>
            <TextField
              size="small"
              color="secondary"
              type="date"
              value={ date }
              onChange={ (e) => setDate(e.target.value) }
              variant="outlined"
            />
            <Button
              className="today-button"
              onClick={ (e) => setDate(new Date().toJSON().slice(0, 10)) }
              variant="contained"
              color="secondary"
              startIcon={ <TodayIcon /> }
            >
              Today
            </Button>
          </div>
          <br />
          <br />
          <div>
            <div className="cover-full">
              <span className="text-h1">In</span>
              <TextField
                size="small"
                color="secondary"
                type="time"
                value={ timeIn }
                onChange={ (e) => setTimeIn(e.target.value) }
                variant="outlined"
                style={ { flexGrow: "1" } }
              />
              <IconButton
                onClick={ e => timeNow(setTimeIn) }
                color="secondary"
              >
                <ScheduleIcon />

              </IconButton>
              <Button
                variant="contained"
                disabled={ date != '' && timeIn != '' ? false : true }
                color="primary"
                onClick={ save }
              >
                save In
              </Button>
            </div>
            <br />
            <div className="cover-full">
              <span className="text-h1">Out</span>
              <TextField
                size="small"
                color="secondary"
                type="time"
                value={ timeOut }
                onChange={ (e) => setTimeOut(e.target.value) }
                style={ { flexGrow: "1" } }
                variant="outlined"
              />
              <IconButton
                onClick={ e => timeNow(setTimeOut) }
                variant="contained"
                color="secondary"
              >
                <ScheduleIcon />
              </IconButton>
              <Button
                variant="contained"
                disabled={ timeOut != '' ? false : true }
                color="primary"
                onClick={ saveDay }
              >
                save Out
              </Button>
            </div>
            <br />
          </div>
          <div style={{maxWidth: '500px', width: '100%', display: 'flex', margin: '10px', justifyContent:'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={e => setShowSecondTime(!showSecondTime)}
            >
              {showSecondTime ? 'close' : 'add'}
            </Button>
          </div>


          {/* #########################################################
               --------------------------------------------------------
                ######################################################## */ }


          {showSecondTime ?
          <div>
            <h3 style={{color: 'red', textAlign:'center'}}>
              only full if its the second time for that day
            </h3>
            <h3 style={{color: 'red', textAlign:'center'}}>
               & you already filled in the first one
            </h3>
          <div className="cover-full">
            <span className="text-h1">In</span>
            <TextField
              size="small"
              color="secondary"
              type="time"
              value={ timeIn2 }
              onChange={ (e) => setTimeIn2(e.target.value) }
              variant="outlined"
              style={ { flexGrow: "1" } }
            />
            <IconButton
              onClick={ e => timeNow(setTimeIn2) }
              color="secondary"
            >
              <ScheduleIcon />

            </IconButton>
            <Button
              variant="contained"
              disabled={ date != '' && timeIn2 != '' ? false : true }
              color="primary"
              onClick={ saveSecond }
            >
              save In
            </Button>
          </div>
          <br />
          <div className="cover-full">
            <span className="text-h1">Out</span>
            <TextField
              size="small"
              color="secondary"
              type="time"
              value={ timeOut2 }
              onChange={ (e) => setTimeOut2(e.target.value) }
              style={ { flexGrow: "1" } }
              variant="outlined"
            />
            <IconButton
              onClick={ e => timeNow(setTimeOut2) }
              variant="contained"
              color="secondary"
            >
              <ScheduleIcon />
            </IconButton>
            <Button
              variant="contained"
              disabled={ timeOut2 != '' ? false : true }
              color="primary"
              onClick={ saveDaySecond }
            >
              save Out
            </Button>
          </div>
          <br />
        </div> : null }
        </div>
        <WorkSearch
          database={ props.database }
          users={ props.users }
          user={ props.user }
        />
      </div>
    )
  } else {
    return <SignIn signInWithGoogle={ props.signInWithGoogle } />
  }
}

export default WorkPage
