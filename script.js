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

    const resetBoard = () => createBoard;

    const updateCell = (row, column, value) => {
        if (row < 0 || row >= board.length || column < 0 || column >= board[0].length) {
            console.log("Invalid position");
            return;
        }
        board[row][column] = value;
    }

    return{resetBoard,getBoard,updateCell}
})();

console.log(gameBoard.getBoard()); 
gameBoard.updateCell(0, 0, "X");
gameBoard.updateCell(0, 1, "X");
gameBoard.updateCell(0, 2, "X");
gameBoard.updateCell(1, 0, "X");
gameBoard.updateCell(1, 1, "X");
gameBoard.updateCell(1, 2, "X");
gameBoard.updateCell(2, 0, "X");
gameBoard.updateCell(2, 1, "X");
gameBoard.updateCell(2, 2, "X");



//const Player 
