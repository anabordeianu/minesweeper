import React from 'react';
import './Minesweeper.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerElapsed: 0,
            run: this.run()
         };

        this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {

        this.setState({
            timerOn: true,
            timerStart: Date.now(),
            timerElapsed: this.state.timerElapsed
        });

        this.state.timerOn && (this.timer = setInterval(() => {
            this.setState({
                timerElapsed: Date.now() - this.state.timerStart
            });
        }, 1000));
    }

    stopTimer() {
        this.setState({
            timerOn: false
        })
    }

    run() {
        this.props.started && this.startTimer();
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

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isHidden: true
        };
    }

    handleClick(event) {
        this.setState({
            isHidden: false
        });

        this.props.stepCounter();
    }

    componentDidUpdate() {
        if(this.props.isBomb){
            console.log("the bro lost");
            this.props.stat();
        }
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
                <div className="cell bomb flex-center">
                    <span className="dot"></span>
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

        this.handleFin = this.handleFin.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.boardDisplay = this.boardDisplay.bind(this);
        
        this.state = {
            stepCount: 0,
            fin: 0, /* lost = -1, win = 1 */
            board: this.boardDisplay()
        };
    }

    handleStep() {
        this.setState({
            stepCount: this.state.stepCount + 1,
        });
    }

    handleFin() {
        this.setState({
            fin: -1
        });
    }

    boardDisplay() {
        var cols = [];
        var rows = [];
        var random_bool;
        var counter = 0;
        var key = 0;
    
        for(var j=0; j<this.props.rows; j++) {
            for(var i=0; i<this.props.cols; i++) {
                if(counter<this.props.bombNo) {
                    random_bool = Math.random() >= 0.8;
                    if(random_bool) counter++;
                } else random_bool = false;
                cols.push(<Cell key={(key++).toString()} isBomb={random_bool} stepCounter={this.handleStep} stat={this.handleFin}/>);
            }
        rows.push(<div key={(key++).toString()} className="row">{cols}</div>);
        cols = [];
        }
    
        return rows;
    }

    render() {
            return (
                <>
                    <div className="title">Minesweeper</div>
                    <div className="status">
                        <Timer />
                        <div className="step-count">
                            {this.state.stepCount}
                        </div>
                    </div>
                    <div className="board-container">
                        {this.state.board}
                    </div>
                </>
            );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="main-container flex-center">
                <Board rows="10" cols="8" bombNo="15" />
            </div>
        )
    }
}

var sendScoreToAPI = () => {
    //get player name from browser prompt
    var playerName = prompt("Congrats for winning the game! Please enter your name: ", "Alexa");
    if (playerName != null) {
      var dataToSave = {
        playerScore: 10, //replace 10 with your actual variable (probably this.state.gameScore or this.state.time)
        playerName: playerName,
        currentTime: new Date()
      };
      // Actual API call
      fetch(
        "https://api.example.com/minesweeper", // replace with the url to your API
        {method: 'POST', body: JSON.stringify(dataToSave)}
        )
        .then(res => res.json())
        .then(
          (result) => {
            alert('You saved your score');
          },
          // Note: it's important to handle errors here
          (error) => {
            alert('Bad API call');
            console.log(error);
          }
        )
    }
  }

export default Game;