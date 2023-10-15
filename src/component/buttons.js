import accept from '../assets/accept.png';
import end from '../assets/end.png';
import talk from '../assets/mute.png';
import './styles/buttons.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

let mediaRecorder, chunks = []


function Buttons() {
    
    // mediaRecorder setup for audio
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('mediaDevices supported..')

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            mediaRecorder = new MediaRecorder(stream)

            mediaRecorder.onstart = () => {
                console.log("Media recorder started")
            }

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                console.log("Media recorder stopped")
                const blob = new Blob(chunks, { 'type': 'audio/wav; codecs=opus' })
                chunks = []
                saveAs(blob, "file.wav");
                
                axios.get("http://localhost:3001/speech")
                
            }
    
        }).catch(error => {
            console.log('Following error has occured : ', error)
        })
    }
    
    return (
        <div className="button-bar">
            <button className="accept-button" onClick={startRecord} ><img src={accept} alt="Accept" /></button>
            <button className="end-button" onClick=""><img src={end} alt="End" /></button>
            <button className="talk-button" onClick={stopRecord}><img src={talk} alt="Talk" /></button>
        </div>
    );
}

function startRecord() {
    if (mediaRecorder.state !== "recording") {
        mediaRecorder.start()
    }
}

function stopRecord() {
    if (mediaRecorder.state === "recording") {
        mediaRecorder.stop()
    }
}

export default Buttons;
