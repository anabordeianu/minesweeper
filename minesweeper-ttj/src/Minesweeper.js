import React from 'react';
import './Minesweeper.css';
import Send from './assets/send.svg';
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerElapsed: 0,
         };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
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
        this.props.time();
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
        this.handleInput = this.handleInput.bind(this);
        this.handleTime = this.handleTime.bind(this);
        
        this.state = {
            stepCount: 0,
            fin: 0, /* lost = -1, win = 1 */
            board: this.boardDisplay(),
            user: "",
            timeStart: false
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

    handleTime() {
        this.setState({
            timeStart: true
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
                cols.push(<Cell key={(key++).toString()} isBomb={random_bool} stepCounter={this.handleStep} stat={this.handleFin} time={this.handleTime}/>);
            }
        rows.push(<div key={(key++).toString()} className="row">{cols}</div>);
        cols = [];
        }
    
        return rows;
    }

    handleInput(event) {
        this.setState({
            user: event.target.value
        });
    }

    fin() {
        if(this.state.fin === 1)
            return (
                <>
                    <div className="dialog">
                        <h2>Bro...</h2>
                        <p>Too bad, you lost after <strong>{this.state.stepCount} points</strong></p>
                    </div>
                </>
            )
        else if(this.state.fin === -1)
            return (
                <div className="won-dialog flex-center">
                    <div className="dialog">
                        <h2>Wow! Awesome!</h2>
                        <label htmlFor="userName">Give us your name:</label>
                        <input type="text" name="userName" placeholder="Winner" value={this.state.user} onChange={this.handleInput}></input>
                    </div>
                    <div className="btn-dialog flex-center" onClick={() => sendScoreToAPI(this.state.user, this.state.stepCount)}>
                        <img src={Send} />
                    </div>
                </div>
        )

    }

    render() {
            return (
                <>
                    <div className="title">Minesweeper</div>
                    <div className="status">
                        <Timer time={this.state.timeStart}/>
                        <div className="step-count">
                            {this.state.stepCount}
                        </div>
                    </div>
                    <div className="board-container">
                        {this.state.board}
                    </div>
                    {this.fin()}
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

var sendScoreToAPI = (passedName, score) => {
    //get player name from browser prompt
    var playerName = passedName;
    if (playerName != null) {
      var dataToSave = {
        playerScore: score, //replace 10 with your actual variable (probably this.state.gameScore or this.state.time)
        playerName: playerName,
        currentTime: new Date()
      };
      // Actual API call
      fetch(
        "https://api.example.com/minesweeper", // replace with the url to your API
        {
          method: 'POST', 
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSave)
        }
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