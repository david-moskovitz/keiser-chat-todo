import {useState, useEffect} from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import Fab from '@material-ui/core/Fab'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import MicOffIcon from '@material-ui/icons/MicOff';
import vmsg from "vmsg";



const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});


const VoiceRecorder = (props) => {

  // const [recordState, setRecordState] = useState(null)
  // const [audioData, setAudioData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState(null)

  const start = async () => {
    setIsRecording(true);
    await recorder.initAudio();
    await recorder.initWorker();

    recorder.startRecording();
    // setAudioData(null)
    // setIsRecording(true)
    // setRecordState(RecordState.START)
  }

  const pause = () => {
    // setRecordState(RecordState.PAUSE)
  }

  const stop = async () => {
    const blob = await recorder.stopRecording();
    setRecordings(URL.createObjectURL(blob))
    setIsRecording(false)
    // setRecordState(RecordState.STOP)
    // setIsRecording(false)
  }


  const handleStop = (data) => {
    // setAudioData(data)
  }
  const save = () => {
  //   var getFileBlob = function (url, cb) {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("GET", url);
  //     xhr.responseType = "blob";
  //     xhr.addEventListener('load', function() {
  //       cb(xhr.response);
  //     });
  //     xhr.send();
  //   };
  //   const metadata = {
  //     contentType: 'audio/mpeg',
  //   };
  //   getFileBlob(audioData.url, blob => {
  //     props.storage.ref().child(`records/gfhghjghjgjhfgfgh.mp3`)
  //       .put(blob, metadata).then((snap) => {
  //         snap.ref.getDownloadURL().then(url => {
  //           const newVoice = {
  //             title: 'test',
  //             completed: false,
  //             mentions: ['@david_moskovitz'],
  //             read: {'@david_moskovitz': false},
  //             owner: `@${props.user.displayName}`,
  //             voiceNote: url,
  //             ref: snap.ref.fullPath,
  //             createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
  //           }
  //           props.database.collection("TodosTemp").add(newVoice)
  //         })
  //       })
  //   })
    
   }

  // console.log(recordState, audioData)
  return (
    <>
      <AudioReactRecorder
        // state={recordState}
        onStop={handleStop}
        type="audio/mpeg"
        canvasHeight="50px"
        backgroundColor="#a6ca5c"
        foregroundColor="#1b9ec8"
      />
      <audio
        id='audio'
        controls
        src={recordings ? recordings : null}
      ></audio>
      <Fab
        size="small"
        color="primary"
        onClick={isRecording ? stop : start}
      >
        {isRecording ? <MicOffIcon /> : <KeyboardVoiceIcon />}
      </Fab>
      <button id='record' onClick={start}>
        Start
      </button>
      <button id='pause' onClick={pause}>
        Pause
      </button>
      <button id='stop' onClick={stop}>
        Stop
      </button>
      <button id='stop' onClick={save}>
        Save
      </button>
    </>
  )
}

export default VoiceRecorder
