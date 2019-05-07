module.exports =  class Board {
    constructor() {
        this.countMoves = 0;
        this.playersInGame = 0;
        this.boardSize = 4;
        this.boardStatus = {
            EMPTY: 0,
            PLAYER1: 1,
            PLAYER2: 2
        };
        this.score = {
            player1: 0,
            player2: 0
        }
        this.turn = this.boardStatus.PLAYER1;
        this.board = this.initBoard();
    }

    initBoard() {
        var board = [];
        for (var i = 0; i < this.boardSize; i++) {
            var boardRow = [];
            for (var j = 0; j < this.boardSize; j++) {
                boardRow.push(this.boardStatus.EMPTY);
            }
            board.push(boardRow);
        }
        console.log(this.boardSize);
        return board;
    }

    changeBoard(i, j, player) {
        if (this.board[i][j] === this.boardStatus.EMPTY) {
            this.board[i][j] = player;
            this.countMoves++;
        }
    }

    winningScore(player) {
        if (player === this.boardStatus.PLAYER1) {
            this.score.player1++;
        } else if (player === this.boardStatus.PLAYER2) {
            this.score.player2++;
        }
    }

    rowColCheck(i, j, player, cellNum, isRowCheck) {
        if (cellNum === this.boardSize) {
            return true;
        }

        const rowIncreasement = isRowCheck ? i : i + 1;
        const columnIncreasement = isRowCheck ? j + 1 : j;

        if (this.board[i][j] === player) {
            return this.rowColCheck(rowIncreasement, columnIncreasement, player, cellNum + 1, isRowCheck);
        }
        return false;
    }

    ObliqueCheck(i, j, player, cellNum, isObliqueReverse) {
        if (cellNum === this.boardSize) {
            return true;
        }

        const direction = isObliqueReverse ? -1 : 1;
        if (this.board[i][j] === player) {
            return this.ObliqueCheck(i + 1, j + (1 * direction), player, cellNum + 1, isObliqueReverse);
        }
        return false;
    }

    checkWinning(i, j, player) {
        if (this.rowColCheck(i, 0, player, 0, true) || 
            this.rowColCheck(0, j, player, 0, false)) {
            return true;
        }
        
        const checkOblique = i === j || i + j === (this.boardSize - 1);

        if (checkOblique && (
            this.ObliqueCheck(0, 0, player, 0, false) || 
            this.ObliqueCheck(0, this.boardSize - 1, player, 0, true))) {
            return true;
        }

        return false;
    }

    resetGame() {
        this.board = this.initBoard();
        this.turn = this.boardStatus.PLAYER1;
        this.countMoves = 0;
    }
}