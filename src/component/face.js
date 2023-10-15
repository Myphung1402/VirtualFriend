import './styles/face.css'
import video from "../assets/or_idle.mp4"
function Face() {
    return (
        <div className="face">
            <video className='video' id="video" loop autoPlay muted>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    );
}

export default Face;