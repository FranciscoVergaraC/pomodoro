import './App.css';
import Todolist from './Components/Todolist/todolist';
import React from 'react';

class App extends React.Component {

  render (){
    return(
    <div className="App">
      <Todolist/>
    </div>
  )  
  }
  
}

export default App;
