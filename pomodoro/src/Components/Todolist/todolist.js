import React from 'react';
import './todolist.css';

class Todolist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            etiqueta: '',
            trabajoRealizado: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        let temporal = this.state.trabajoRealizado;
        console.log(temporal);
        temporal.push(this.state.etiqueta);
        console.log(temporal);
        this.setState(
        {
            trabajoRealizado: temporal,
        }
        );

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    render(){
        return (
            <div >
                <form>
                    <label>Etiqueta tu pomodoro </label>
                        <input type="text" name="etiqueta" onChange={this.handleInputChange}/>
                        <input type="submit" value="Comenzar" onClick={this.handleSubmit.bind(this)} />
                </form>
                <ul>
                    {this.state.trabajoRealizado.map(string => 
                    <li>{string}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Todolist;