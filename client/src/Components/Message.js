import React from 'react';

const startNewGame = (socket) => {
    socket.emit('newGame');
}

function Message (props) {
    var {turn, winning, winner, player, socket, boardStatus} = props;
    
    const printTurn = (turn, boardStatus , player) => {
        let message = "";
        if(turn === player){
            message = "Your turn";
        }
        else {
            message = "Opponent turn";
        }

        return (
            <div className="message">
                {message}
            </div>
        )
    }

    const printWinner = (winner, player, socket, boardStatus ) =>{
        let message = "";
        if(winner === boardStatus.EMPTY){
            message = "Its a Tie!";
        }
        else if(player === winner){
            message = "You Win!";
        }
        else{
            message = "You Lose!";
        }
    
        return (
            <div className="message">
                <h4>{message}</h4>
                <button 
                    className="btn-rematch"
                    type="button" 
                    onClick={() => startNewGame(socket)} 
                    >New Game</button>
            </div>
        )
    }

    return winning ?
        printWinner(winner, player, socket, boardStatus) :
        printTurn(turn, boardStatus , player);   
}

export default Message;
