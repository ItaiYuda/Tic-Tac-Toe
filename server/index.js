const express = require("express");
const socketIo = require("socket.io");
const Board = require('./board.js'); 
const app = express();

const server = app.listen(4000, () =>{
    console.log('listen port 4000');
});

var board = new Board();

const io = socketIo(server);

io.on('connection', function(socket){
    console.log(`made connection - ${socket.id}`);
    
    socket.emit('HandShake' , ({board: board.board , turn: board.turn, score: board.score, playersInGame: board.playersInGame}), fn => {
        board.playersInGame++;
    });

    socket.on('BoardChange' , (data) => {
        let { rIndex, cIndex, player} = data;
        board.changeBoard(rIndex, cIndex, player);
        board.turn = player === board.boardStatus.PLAYER1 ? board.boardStatus.PLAYER2 : board.boardStatus.PLAYER1;
               
        io.sockets.emit('BoardChange', board.board, board.turn);

        const winning = board.checkWinning(rIndex, cIndex, player); 
        const tie = board.countMoves === board.boardSize* board.boardSize;
        if(winning || tie){
            if(tie){
                player = board.boardStatus.EMPTY;
            }
            board.winningScore(player);
            io.sockets.emit('winning', board.score, player);
        }
    })

    socket.on('newGame', () => {
        board.resetGame();
        io.sockets.emit('newGame', board.board, board.turn);
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} Disconnected`)
    })
})