import React, {useState} from 'react';
import './todolist.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

/* Quiero poder reiniciar el timer, pero la libreria que estoy usando usa react hooks, que era algo que tarde o termprano
iba a tener que aprender, los siguientes pasos estan aca: https://es.reactjs.org/docs/hooks-overview.html */

const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60
    if (remainingTime === 0) {
        return <div className="timer">End of Period</div>;
      }
    return `${hours}:${minutes}:${seconds}`
  }

class Todolist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            etiqueta: '',
            trabajoRealizado: [],
            hoursMinSecs: {hours:0, minutes:0, seconds:0},
            start: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
    }

    

    handleSubmit(event){
        event.preventDefault();
        let temporal = this.state.trabajoRealizado;
        this.setState(
            {
                start: true
            }
        );
        if(this.state.etiqueta !== ''){
            console.log("Se detecta se agrego algo")
            temporal.push(this.state.etiqueta);
            console.log(this.state.etiqueta !== '')
            this.setState(
                {
                    trabajoRealizado: temporal,
                })
        };
        console.log("Se detecta un submit")
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleMinuteChange(event) {
        console.log("el handler fue usado")
        const target = event.target;
        console.log(target.value)
        switch(target.value){
            case "25":
                console.log("entramos al caso 25")
                this.setState({
                    hoursMinSecs: {hours:0, minutes:0, seconds:10}
                })
            break;
            case "45":
                console.log("entramos al caso 45")
                this.setState({
                    hoursMinSecs: {hours:0, minutes:45, seconds:0}
                })
            break;
            case "60":
                console.log("entramos al caso 60")
                this.setState({
                    hoursMinSecs: {hours:1, minutes:0, seconds:0}
                })
            break;                
        }
    }


    render(){
        return (
            <div >
                <form>
                    <label>Etiqueta tu pomodoro </label>
                        <input type="text" name="etiqueta" onChange={this.handleInputChange}/><br/>
                    <label>Tiempo del Pomodoro</label>
                    <select name="hoursMinSecs" onChange={this.handleMinuteChange}>
                        <option value="25">25</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select><br/>
                        <input type="submit" value="Comenzar" onClick={this.handleSubmit} />
                </form>
                {this.state.start == true && 
                    <div>
                        <CountdownCircleTimer
                                isPlaying
                                duration={parseInt(this.state.hoursMinSecs.seconds)+parseInt(this.state.hoursMinSecs.minutes)*60+parseInt(this.state.hoursMinSecs.hours)*60*60}
                                colors={[
                                ['#3399ff', 0.33],
                                ['#F7B801', 0.33],
                                ['#A30000', 0],
                                ]}
                                >
                                {children}
                        </CountdownCircleTimer>
                    </div>
                }



                <p>Trabajo realizado:</p>
                {this.state.trabajoRealizado != [""] &&
                    <ul>
                        {this.state.trabajoRealizado.map(string => 
                        <li>{string}</li>
                        )}
                    </ul>
                }
            </div>
        )
    }
}

export default Todolist;