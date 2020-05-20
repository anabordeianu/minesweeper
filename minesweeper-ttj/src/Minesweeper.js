import React from 'react';
import './Minesweeper.css';

class MineCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 10 /* numarul de mine din joc */
        }
    }
    /* mai trb iconita */
    render() {
        return (
            <div className="mineCount">
                {this.state.number}
            </div>
        )
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerElapsed: 0
         };

        this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {

        this.setState({
            timerOn: true,
            timerStart: Date.now(),
            timerElapsed: this.state.timerElapsed
        });

        this.timer = setInterval(() => {
            this.setState({
                timerElapsed: Date.now() - this.state.timerStart
            });
        }, 1000);
        console.log(this.state.timerElapsed);
    }

    stopTimer() {
        this.setState({
            timerOn: false
        })
    }

    render() {
        const { timerElapsed } = this.state;
        let seconds = ("0" + (Math.floor(timerElapsed / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerElapsed / 60000) % 60)).slice(-2);
    
        /* mai trb iconita */
        return (
            <div className="timer-display">
                {minutes} : {seconds} 
                {
                    !this.state.timerOn && 
                    <button onClick={this.startTimer}>Start</button>
                }
            </div>
        )
    }

}

function Status () {
    return (
        <>
        <div className="title">Minesweeper</div>
        <div className="status">
            <Timer />
            <MineCount />
        </div>
        </>
    )
}
class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    render() {
        return (
            <div className="container flex-center">Aici vine nebunia</div>
        )
    }
}

function RenderGame() {
    return (
        <div className="main-container flex-center">
            <Status />
            <Minesweeper />
        </div>
    )
}

export default RenderGame;