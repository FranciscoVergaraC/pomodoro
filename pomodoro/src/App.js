import logo from './logo.svg';
import './App.css';
import Todolist from './Components/Todolist/todolist';
import CountDownTimer from './Components/Timer/timer';
import React from 'react';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      start: false,
      hoursMinSecs: {hours:0, minutes:0, seconds:20}
    }
    };

  render (){
    return(
    <div className="App">
      <header className="App-header">
        {this.state.start == true && <CountDownTimer hoursMinSecs={this.state.hoursMinSecs}/>
        }

        <p>Welcome to Pomodoro</p>
        <Todolist/>
      </header>
    </div>
  )  
  }
  
}

export default App;
