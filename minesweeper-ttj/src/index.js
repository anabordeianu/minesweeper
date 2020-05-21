import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from './User'
import Game from './Minesweeper';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <User />
=======
    <Game />
>>>>>>> e307e6874a8501fa1dbe42c8794a921cfde225b3
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
