import React, { useCallback } from 'react'
import Timer from 'react-compound-timer'
import './timer.css'

/* Se importo por npm el siguiente package: https://www.npmjs.com/package/react-compound-timer*/

class PomodoroTimer extends React.Component {

    render (){

        console.log(this.props.time);

        return (
                <div>
                <Timer 
                    initialTime={this.props.time}
                    startImmediately={false} 
                    direction="backward"
                    lastUnit="m"
                    checkpoints = {[
                        {
                            time: 1,
                            callback: ()=>this.props.updateComplete()
                        }
                    ]} 
                    
                >
                    {({ start, resume, pause, stop, reset, timerState }) => (
                        <React.Fragment>
                            <div className="Timero" >
                                <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />:
                                <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                            </div>
                            <div>
                                <button onClick={start} >Start</button>
                                <button onClick={pause}>Pause</button>
                                <button onClick={resume}>Resume</button>
                                <button onClick={stop}>Stop</button>
                                <button onClick={reset}>Reset</button>
                            </div>
                        </React.Fragment>
                    )}
                </Timer>
                </div>  
        )
    }
}


export default PomodoroTimer;