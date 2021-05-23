import React,{useEffect, useState} from 'react'

const Progress = (props) => {
  const [mainGoal, setMainGoal] = useState(0)
  const [personalGoal, setPersonalGoal] = useState(0)
  const [mainGoalGot, setMainGoalGot] = useState(0)
  const [personalGoalGot, setPersonalGoalGot] = useState(0)

  useEffect(() => {
    props.database.doc("goal/main")
    .onSnapshot(snapshot => {
      const data = snapshot.data()
      setMainGoal(data.goal)
      setMainGoalGot(data.got)
    })
  }, [])

  useEffect(() => {
    props.database.doc(`goal/${props.user.displayName}`)
    .onSnapshot(snapshot => {
      const data = snapshot.data()
      setPersonalGoal(data.goal)
      setPersonalGoalGot(data.got)
    })
  }, [])
  const widMain = (Math.floor((mainGoalGot/mainGoal)* 100)) * 3
  const widthMain = {
    width: isNaN(widMain)? 0 : widMain
  }
  const widPersonal = (Math.floor((personalGoalGot/personalGoal)* 100)) * 3
  const widthPersonal = {
    width: isNaN(widPersonal)? 0 : widPersonal
  }

  return (
    <div className="progress">
      <div style={{display: 'flex'}}>
        <label>Main</label>
        <div className="progress-bar">
          <div className="inner-progress" style={widthMain}>
            {`${Math.floor((mainGoalGot/mainGoal)* 100)}%`}
          </div>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <label>Personal</label>
        <div className="progress-bar">
          <div className="inner-progress" style={widthPersonal}>
            {`${Math.floor((personalGoalGot/personalGoal)* 100)}%`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
