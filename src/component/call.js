import Buttons from './buttons.js';
import Face from './face.js';
import './styles/call.css'

function Call() {
  return (
    <div className="Call">
      <Face className="face" />
      <Buttons className="buttons" />
    </div>
  );
}

export default Call;