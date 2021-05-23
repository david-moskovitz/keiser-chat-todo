import React, {useEffect, useState, useRef} from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import CloseIcon from '@material-ui/icons/Close';
import vmsg from "vmsg";
import MicOffIcon from '@material-ui/icons/MicOff';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MicNoneIcon from '@material-ui/icons/MicNone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ClickAwayListener from 'react-click-away-listener';

const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});


const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));


const VoiceForm = (props) => {

  const classes = useStyles();
  const [mention, setMention] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState(null)
  const [openMentions, setOpenMentions] = useState(false)
  const [showAudio, setShowAudio] = useState(false)

  const start = async () => {
    setIsRecording(true);
    await recorder.initAudio();
    await recorder.initWorker();
    recorder.startRecording();
  }
  
  const stop = async () => {
    setIsRecording(false)
    const blob = await recorder.stopRecording();
    setRecordings(URL.createObjectURL(blob))
  }
  
  
  const handleClickAwayOptions = () => {
    setOpenMentions(false)
    setShowAudio(false)
  }

  const handleUserClick = (user) => {
    const noSpaceUser = user.name.replace(/ /g, '_')
    if (mention.includes(`@${noSpaceUser}`)) {
      setMention(mention.filter(u => u!= `@${noSpaceUser}`))
    } else {
      setMention([...mention, `@${noSpaceUser}`])
    }
  }


  const save = () => {
    var getFileBlob = function (url, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function() {
        cb(xhr.response);
      });
      xhr.send();
    };
    const metadata = {
      contentType: 'audio/mpeg',
    };
    const mentions = mention.length > 0 ? mention : Array.from(props.users, d => `@${d.name.replace(/ /g, '_')}`);
    const read = {}
    mentions.forEach(u => {
      read[u]= false
    })
    getFileBlob(recordings, blob => {
      props.storage.ref().child(`records/${props.user.displayName}${new Date().toJSON()}.mp3`)
        .put(blob, metadata).then((snap) => {
          snap.ref.getDownloadURL().then(url => {
            const newVoice = {
              title: 'voice note',
              completed: false,
              mentions,
              read,
              owner: `@${props.user.displayName}`,
              voiceNote: url,
              ref: snap.ref.fullPath,
              createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
            }
            props.database.collection("TodosTemp").add(newVoice)
          })
        })
    })
    setRecordings(null)
  }
  
  return (
    <>
    <div className="form-paper-div" style={{ display: 'flex'}}>
      <div className="form">
        <Paper square className="form-paper">
          <ClickAwayListener onClickAway={ handleClickAwayOptions }>
            <div className="title-input" style={{display:'flex',justifyContent:'space-between', alignItems: 'center'}} >
              <div
                style={{flexGrow: '1'}}
                onClick={e => setOpenMentions(!openMentions)}>
                <PersonAddIcon />
              </div>
              {isRecording ? 
                <div style={{marginRight: '10px', color: 'red', display:'flex',alignItems: 'center'}}>
                  Recording...<MicNoneIcon />
                </div> : recordings ? 
                  <div
                    style={{flexGrow: '1',display: 'flex', justifyContent:'flex-end', paddingRight: '5px'}}
                    onClick={e => setShowAudio(!showAudio)}>
                    <PlayArrowIcon />
                  </div>
                : null}
            </div>
            {openMentions ? 
              <div className="mentions">
                <List dense>
                  { props.users.map(user => (
                    <div key={ user.name }>
                      <ListItem>
                        <ListItemIcon>
                          <Avatar alt={ user.name.charAt(0) } src={ user.photoURL } className={ classes.small } />
                        </ListItemIcon>
                        <ListItemText>
                          { user.name }
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <Checkbox checked={mention.includes(`@${user.name.replace(/ /g, '_')}`)} edge="start" size="small" onClick={e => handleUserClick(user)} />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  )) }
                </List>
              </div>  : showAudio ?
                (recordings ? <div className="show-audio">
                  <audio controls src={recordings}></audio>
                </div> : null) : null }
          </ClickAwayListener>
        </Paper>
        <button onClick={isRecording ? stop : start} className="send-button">
          {isRecording ? <MicOffIcon /> : <KeyboardVoiceIcon />}
        </button>
        <button onClick={save} className="send-button">
          <SendIcon />
        </button>
        <button onClick={e => props.setIsVoice(false)} className="close-button">
          <CloseIcon />
        </button>
      </div>
    </div>
    </>
  )
}

export default VoiceForm
