import React from 'react';
import './Minesweeper.css';

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
        </div>
        </>
    )
}

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            isHidden: false
        }); 
    }

    render() {
        return (
            <>
            {
                this.state.isHidden &&
                <div className="cell hidden" onClick={this.handleClick}>

                </div>
            }
            {
                
                !this.state.isHidden && this.props.isBomb &&
                <div className="cell bomb">

                </div>
            }
            {
                !this.state.isHidden && !this.props.isBomb &&
                <div className="cell">
                
                 </div>
            }
            </>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepCount: 0
        };
    }
    
    render() {

        var cols = [];
        var rows = [];
        var random_bool;
        var counter = 0;
        var key = 10;

        for(var j=0; j<this.props.rows; j++) {
            for(var i=0; i<this.props.cols; i++) {
                if(counter<this.props.bombNo) {
                    random_bool = Math.random() >= 0.5;
                    if(random_bool) counter++;
                } else random_bool = false;
                cols.push(<Cell key={(key++).toString()} isBomb={random_bool} />);
            }
        rows.push(<div key={(key++).toString()} className="row">{cols}</div>);
        cols = [];
        }

        return (
            <div className="board-container">
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="main-container flex-center">
                <Status />
                <Board rows="10" cols="8" bombNo="10" />
            </div>
        )
    }
}

export default Game;