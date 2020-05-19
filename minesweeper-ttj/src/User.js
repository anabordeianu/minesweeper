import React from 'react';
import './User.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUserClick(event) {
    console.log(this.state.username);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <div className="intro-user-container flex-center">
        <div className="intro-user-info flex-center">
          <label htmlFor="username">Let's get it!</label>
          <input 
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <button 
          type="button" 
          onClick={this.handleUserClick}
        >
          Go!
        </button>
      </div>
    );
  }
}

function Intro() {
  return (
    <div className="intro-container flex-center">
      <User />
    </div>
  );
}

// function Minesweeper() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Intro;
