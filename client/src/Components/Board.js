import React, {Component} from 'react';

class Board extends Component {
    
    handleCellClick = (rIndex,cIndex , socket, board, player, turn, winning) => {

        if(turn !== player || winning){
            return;
        }

        if(board[rIndex][cIndex] === window.boardStatus.EMPTY)
        {
            socket.emit('BoardChange', {
                rIndex,
                cIndex,
                player
            })
        }
    }
    
    render(){
        const { socket, board, player, turn, winning } = this.props
        return board.map((rowData, rIndex) => 
            <div key={rIndex} className="row-table">
                {rowData.map((cell, cIndex) => {
                    if(cell === window.boardStatus.PLAYER2){
                        return (
                            <div 
                                key={rIndex - cIndex} 
                                className="square-table occupied"
                            ><i className="fas fa-times"></i></div>
                        )
                    }
                    else if(cell === window.boardStatus.PLAYER1){
                        return (
                            <div 
                                key={rIndex - cIndex} 
                                className="square-table occupied"
                            ><i className="far fa-circle"></i></div>
                        ) 
                    }
                    else {
                        return (
                            <div 
                                key={rIndex - cIndex} 
                                className="square-table Empty"
                                onClick={() => this.handleCellClick(rIndex,cIndex , socket, board, player, turn, winning )}
                            ></div>
                        ) 
                    }
                    
                })}
            </div>
        )
    }
    
}

export default Board;