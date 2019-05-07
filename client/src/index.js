import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.boardStatus = {
    EMPTY: 0,
    PLAYER1: 1,
    PLAYER2: 2 
};

ReactDOM.render(<App />, document.getElementById('root'));


