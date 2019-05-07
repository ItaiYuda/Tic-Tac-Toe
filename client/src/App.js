import React, { Component } from 'react';
import socketIOCilent from 'socket.io-client';
import Score from './Components/Score';
import Board from './Components/Board';
import Message from './Components/Message';

class App extends Component {
  constructor(){
    super();
    this.state = {
      board: [],
      player: '',
      turn: '',
      score: {},
      winning: false,
      winner: window.boardStatus.EMPTY
    }
    this.socket = socketIOCilent("http://localhost:4000/");
  }

  componentWillUnmount = () => {
    this.socket.close();
  }

  componentWillMount = () => {
    this.socketListener();
  }

  socketListener = () => {
    const {socket } = this
    socket.on('HandShake' ,(data , fn) => {
      const {board, turn, score} = data;
      var player = data.playersInGame % 2 === 0? window.boardStatus.PLAYER1 : window.boardStatus.PLAYER2;  
      this.setState({
        board,
        player,
        turn,
        score 
      });
      fn();
    });
    socket.on('BoardChange', (board,turn) => {
      this.handleBoardChange(board, turn);
    });

    socket.on('winning', (score, player) => {
      this.setState({
        score,
        winning: true,
        winner: player 
      });
    });

    socket.on('newGame', (board, turn) => {
      this.handleBoardChange(board, turn);
      this.setState({
        winning: false,
        winner: window.boardStatus.EMPTY
      });
    })
  }

  handleBoardChange = (board, turn) => {
    this.setState({
      board,
      turn
    });
  }
  
  
  render() {    
    return (
      <div className="App">
        <h1 className="title">Tic-Tac-Toe</h1>
        <Message 
          turn={this.state.turn} 
          winning={this.state.winning}
          player={this.state.player}
          winner={this.state.winner}
          socket={this.socket}
          boardStatus={window.boardStatus}
          />
        <div className="container"> 
          <Score score={this.state.score} scoreToShow={0} player={this.state.player}/>
          <div className="table">
            <Board 
              board={this.state.board} 
              socket={this.socket} 
              player={this.state.player}
              turn={this.state.turn}
              winning={this.state.winning}
              />
          </div>
          <Score score={this.state.score} scoreToShow={1} player={this.state.player}/>   
        </div> 
      </div>
    )
  } 
}

export default App;
