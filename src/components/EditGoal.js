import React, {useEffect, useState} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const EditGoal = (props) => {
  const [name, setName] = useState('')
  const [goal, setGoal ]= useState('')
  const [got, setGot] = useState('')
  const [allGoals, setAllGoals] = useState([])

  useEffect(() => {
    props.database.doc(`goal/${name || 'main'}`)
    .onSnapshot(snapshot => {
      const data = snapshot.data()
      setGoal(data.goal)
      setGot(data.got)
    })
  }, [name])

  useEffect(() => {
    props.database.collection("goal")
      .onSnapshot(snapshot => {
        const newGoal = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAllGoals(newGoal)
      })
  },[])

  const submit = (e) => {
    e.preventDefault();
    props.database.collection("goal").doc(name).set({
      goal: parseInt(goal),
      got: parseInt(got)
    })
    setName("main")
  }
  
  return (
    <>
    <form onSubmit={submit}>
      <br />
      <br />
      <div className="inner-container">
        <span className="text-h1">Name</span>
        <FormControl variant="outlined" color="secondary" size="small" className="name-input-work">
          <Select value={ name } onChange={ e => setName(e.target.value) }>
            <MenuItem value="main">Main</MenuItem>
            { props.users.map(user => <MenuItem value={ user.name }>{ user.name }</MenuItem>) }
          </Select>
        </FormControl>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <br/>
        <span className="text-h1">Goal</span>
        <TextField
          name="goal"
          type="number"
          size="small" 
          value={goal}
          variant="outlined"
          onChange={ e => setGoal(e.target.value)}
        />
        <br/>
        <span className="text-h1">Got</span>
        <TextField
          name="got"
          type="number"
          value={got}
          variant="outlined"
          size="small"  
          onChange={ e => setGot(e.target.value)} 
        />
        <br />
        <Button variant="contained" color="secondary" type="submit">
          save
        </Button>
      </div>
    </form>
    <div style={{width: '100vw', height: '20px', backgroundColor: '#daeeaf', margin: '30px 0px 0px 0px '}} />
    <TableContainer component={Paper}>
      <Table  size="small">
        <TableHead style={{backgroundColor: '#95bcc8'}}>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>goal</TableCell>
            <TableCell>got</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allGoals.map(g => 
              <TableRow>
                <TableCell>{g.id}</TableCell>
                <TableCell>{g.goal}</TableCell>
                <TableCell>{g.got}</TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  )
}

export default EditGoal
