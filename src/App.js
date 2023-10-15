import logo from './logo.svg';
import './App.css';
import Title from './component/title.js'
import Call from './component/call.js';

function App() {
  return (
    <div className="App">
      <Title className="title"/>
      <Call className="call"/>
    </div>
  );
}

export default App;
