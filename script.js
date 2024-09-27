// creating GameBoard
const gameBoard= (function(){
    let board = [];
    const row = 3;
    const column = 3;

    const createBoard = () => {
        for (let i = 0; i < row; i++) {
            board[i] = [];
            for (let j = 0; j < column; j++) {
                board[i][j] = " ";
            }
        }
    }
    createBoard();
    const getBoard = () => board;

    const resetBoard = () => createBoard();

    const updateCell = (row, column, value) => {
        if (row < 0 || row >= board.length || column < 0 || column >= board[0].length) {
            console.log("Invalid position");
            return;
        }
        board[row][column] = value;
    }

    return{resetBoard,getBoard,updateCell}
})();




//Player Object
const Player =(function(){
     return function (playerName,marker){
        return {playerName,marker}
     }
})();




//Creating Game Object.
const Game = (function() {
    let currentPlayer;
    let gameOver;
    const players = [];

    const initialize = () => {
        gameBoard.resetBoard();
        players[0] = Player("Player 1", "X");
        players[1] = Player("Player 2", "O");
        currentPlayer = players[0];
        gameOver = false;
    };

    const switchPlayer = () => {
    
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];

        return winConditions.some(condition => {
            return condition.every(([row, col]) => {
                return board[row][col] === currentPlayer.marker;
            });
        });
    };

    const checkDraw = () => {
        const board = gameBoard.getBoard();
        return board.every(row => row.every(cell => cell !== " "));
    };

    const playRound = (row, col) => {
        if (gameOver || gameBoard.getBoard()[row][col] !== " ") {
            return "Invalid move";
        }

        gameBoard.updateCell(row, col, currentPlayer.marker);

        if (checkWin()) {
            gameOver = true;
            return `${currentPlayer.playerName} wins!`;
        } else if (checkDraw()) {
            gameOver = true;
            return "It's a draw!";
        } else {
            switchPlayer();
            return `${currentPlayer.playerName}'s turn`;
        }
    };

    const getCurrentPlayer = () => currentPlayer;

    const isGameOver = () => gameOver;

    return {
        initialize,
        playRound,
        getCurrentPlayer,
        isGameOver
    };
})();

Game.initialize();
console.log(Game.playRound(0, 0));  
console.log(Game.playRound(0, 1));  
console.log(Game.playRound(1, 1));  
console.log(Game.playRound(1, 2));  
console.log(Game.playRound(2, 2));