import React from 'react';
import './todolist.css';
import CountDownTimer from '../Timer/timer';

class Todolist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            etiqueta: '',
            trabajoRealizado: [],
            hoursMinSecs: {hours:0, minutes:25, seconds:0},
            start: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        let temporal = this.state.trabajoRealizado;
        console.log(temporal);
        temporal.push(this.state.etiqueta);
        console.log(temporal);
        this.setState(
        {
            start: true,
        }
        );
        if(this.state.etiqueta !== ''){
            console.log("Se detecta se agrego algo")
            console.log(this.state.etiqueta !== '')
            this.setState(
                {
                    trabajoRealizado: temporal,
                })
        };
        console.log(this.state.etiqueta !== '')
        console.log(this.state.trabajoRealizado === [""])
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
                    hoursMinSecs: {hours:0, minutes:25, seconds:0}
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
                        <input type="submit" value="Comenzar" onClick={this.handleSubmit.bind(this)} />
                </form>
                {this.state.start == true && <CountDownTimer hoursMinSecs={this.state.hoursMinSecs}/>
                }
                {this.state.trabajoRealizado === [""] &&
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