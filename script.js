const gameBoard = (function () {
    let board = [];

    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = " ";
            }
        }
    };

    const getBoard = () => board;

    const resetBoard = () => createBoard();

    const updateCell = (row, column, value) => {
        if (board[row][column] === " ") {
            board[row][column] = value;
            return true;
        }
        return false;
    };

    return { resetBoard, getBoard, updateCell };
})();

const Player = function (name, marker) {
    return { name, marker };
};

const Game = (function () {
    let currentPlayer;
    let gameOver = false;
    const players = [];

    const initialize = (player1Name, player2Name) => {
        gameBoard.resetBoard();
        players[0] = Player(player1Name, "X");
        players[1] = Player(player2Name, "O");
        currentPlayer = players[0];
        gameOver = false;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const checkWin = () => {
        const board = gameBoard.getBoard();
        const winConditions = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        return winConditions.some((condition) => {
            return condition.every(([row, col]) => {
                return board[row][col] === currentPlayer.marker;
            });
        });
    };

    const checkDraw = () => {
        const board = gameBoard.getBoard();
        return board.every((row) => row.every((cell) => cell !== " "));
    };

    const playRound = (row, col) => {
        if (gameOver || !gameBoard.updateCell(row, col, currentPlayer.marker)) {
            return false;
        }

        if (checkWin()) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        } else if (checkDraw()) {
            gameOver = true;
            return "It's a draw!";
        } else {
            switchPlayer();
            return `${currentPlayer.name}'s turn`;
        }
    };

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;

    return { initialize, playRound, getCurrentPlayer, isGameOver };
})();

// DOM Interaction Code
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startButton = document.getElementById('start-game');
    const gameBoardDiv = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-game');

    function updateBoard() {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            cell.textContent = board[row][col];
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        const row = Math.floor(index / 3);
        const col = index % 3;

        const result = Game.playRound(row, col);
        if (result) {
            gameStatus.textContent = result;
            updateBoard();

            if (Game.isGameOver()) {
                cells.forEach((cell) => cell.removeEventListener('click', handleCellClick));
                restartButton.classList.remove('hidden');
            }
        }
    }

    function startGame() {
        const player1Name = player1Input.value || 'Player 1';
        const player2Name = player2Input.value || 'Player 2';

        Game.initialize(player1Name, player2Name);
        updateBoard();
        gameStatus.textContent = `${Game.getCurrentPlayer().name}'s turn`;
        gameBoardDiv.classList.remove('hidden');
        restartButton.classList.add('hidden');
        cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
});
