import logo from './logo.svg';
import './App.css';
import Todolist from './Components/Todolist/todolist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Pomodoro</p>
        <Todolist/>
      </header>
    </div>
  );
}

export default App;
