import accept from '../assets/accept.png';
import end from '../assets/end.png';
import talk from '../assets/mute.png';
import './styles/buttons.css';

function Buttons() {
    return (
        <div className="button-bar">
            <button className= "accept-button" onClick={playVideo} ><img src={accept} alt= "Accept"/></button>
            <button className= "end-button" onClick=""><img src={end} alt= "End"/></button>
            <button className= "talk-button" onClick=""><img src={talk} alt= "Talk"/></button>
        </div>
    );
}
function playVideo() {
    document.getElementById('video').play();
}
export default Buttons;
