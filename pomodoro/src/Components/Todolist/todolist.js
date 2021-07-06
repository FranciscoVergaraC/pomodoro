import React from 'react';
import './todolist.css';
import PomodoroTimer from '../Timer/timer'
import audio from './alarm2.mp3'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'


/*
    Para mejora un poco la interfaz grafica se comenzaron a agregar elementos de bootstrap. 
    Pendientes:
    1.- Aprender a editar el CSS de un bootstrap. 
*/

class Todolist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            etiqueta: 'Sin Etiquetar',
            trabajoRealizado: [],
            hoursMinSecs: 25*60*1000,
            complete: false,
            displayMenu: false,
            show: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.milisecondsToFormat = this.milisecondsToFormat.bind(this);
        this.updateComplete = this.updateComplete.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.sound = this.sound.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose(){
        this.setState({
            show: false
        })
    };

    handleShow(){
        this.setState({
            show: true
        })
    };

    updateComplete(){
        this.sound();
        console.log("El componente timer logro actualizar el submit");
        let temporal = this.state.trabajoRealizado;
        console.log(temporal);
        if(this.state.etiqueta !== ''){
            console.log("Se detecta que se agrego algo")
            temporal.push([this.state.etiqueta,this.state.hoursMinSecs]);
            console.log(this.state.etiqueta !== '')
            this.setState(
                {
                    trabajoRealizado: temporal,
                    start: false,
                })

        };
        
    }

    sound(){
        new Audio(audio).play();
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
            case "5":
                console.log("entramos al caso 5")
                this.setState({
                    hoursMinSecs: 5*60*1000
                })
            break;
            case "15":
                console.log("entramos al caso 15")
                this.setState({
                    hoursMinSecs: 15*60*1000
                })
            break;
            case "25":
                console.log("entramos al caso 25")
                this.setState({
                    hoursMinSecs: 25*60*1000
                })
            break;
            case "45":
                console.log("entramos al caso 45")
                this.setState({
                    hoursMinSecs: 45*60*1000
                })
            break;
            case "60":
                console.log("entramos al caso 60")
                this.setState({
                    hoursMinSecs: 60*60*1000
                })
            break;                
        }
    }

    milisecondsToFormat(duration){
        var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds ;
    }

    openMenu(){
        this.setState({displayMenu: !this.state.displayMenu})
    }


    render(){
        let tiempoTotalTrabajado = this.state.trabajoRealizado.map((element, index, array) => element[1])
        if (this.state.trabajoRealizado.length>0){
            console.log(tiempoTotalTrabajado.reduce((a,b) => a+b));
        }

/*                    <div id="myModal" className="modal">
                            <div className="modal-content">
                                <button onClick={this.openMenu}>x</button>
                                <br></br>
                        </div>
                    </div>
*/

        return (
            <div className="base">
                  <style type="text/css">
                    {`
                    .btn-flat {
                    background-color:  rgb(236, 112, 108);
                    color: white;
                    }
                    `}
                </style>
                <div className="header">
                    <span>Pomodoro</span>
                    <Button variant="flat" onClick={this.handleShow}>
                    Settings
                    </Button>
                </div><br></br>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <label>Tiempo del Pomodoro </label>
                                <select name="hoursMinSecs" onChange={this.handleMinuteChange}>
                                    <option value="25">25</option>
                                    <option value="45">45</option>
                                    <option value="60">60</option>
                                </select><br/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <div className="mainTimer">
                    <button value="25" onClick={this.handleMinuteChange}>Pomodoro</button>
                    <button value="5" onClick={this.handleMinuteChange}>Short Break</button>
                    <button value="15" onClick={this.handleMinuteChange}>Long Break</button>
                    <br/>
                    <PomodoroTimer key={this.state.hoursMinSecs} time={this.state.hoursMinSecs} updateComplete={this.updateComplete}/>
                </div>
                <br/>
                <form>
                    <label>Working on </label>
                    <input type="text" name="etiqueta" onChange={this.handleInputChange}/><br/>
                </form>
                <br/>
                {this.state.trabajoRealizado.length>0 &&
                    <div className="tableSection">
                        <table>
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trabajoRealizado.map((element, index, array) =>
                                    <tr> 
                                        <td>{element[0]}</td>
                                        <td>{this.milisecondsToFormat(element[1])}</td>
                                    </tr>
                                )}  
                            </tbody>
                            {this.state.trabajoRealizado.length>1 &&
                                <tfoot>
                                    <td>Total</td>
                                    <td>{this.milisecondsToFormat(tiempoTotalTrabajado.reduce((a,b) => a+b))}</td>    
                                </tfoot>
                            }
                        </table>
                        <ul>

                        </ul>
                    </div>
                }
            </div>
        )
    }
}

export default Todolist;