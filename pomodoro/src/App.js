import logo from './logo.svg';
import './App.css';
import Todolist from './Components/Todolist/todolist';
import CountDownTimer from './Components/Timer/timer';

function App() {

  const hoursMinSecs = {hours:0, minutes: 0, seconds: 20}

  return (
    <div className="App">
      <header className="App-header">
        <CountDownTimer hoursMinSecs={hoursMinSecs}/>
        <p>Welcome to Pomodoro</p>
        <Todolist/>
      </header>
    </div>
  );
}

export default App;
