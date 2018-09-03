const emptyField = ' ';

const horizontal = ({ move, index }) => ({ row: move.row, col: index });

const vertical = ({ move, index }) => ({ row: index, col: move.col });

const diagonalRight = ({ index }) => ({ row: index, col: index });

const diagonalLeft = ({ size, index }) => ({ row: index, col: size - index - 1 });

const validateDirection = (board, move, getCurrentPosition) => {
  let positions = [];
  const size = board[0].length;
  const playerId = board[move.row][move.col];

  if (playerId !== emptyField) {
    for (let i = 0; i < size; i++) {
      const currentPosition = getCurrentPosition({ size, move, index: i });
      const currentPlayer = board[currentPosition.row][currentPosition.col];
      positions = (currentPlayer === playerId) ? [...positions, currentPosition] : [];

      if (positions.length >= size) {
        return { positions, player: playerId };
      }
    }
  }
  return undefined;
};


module.exports = {
  createBoard: (size) => {
    if (size < 3 || size > 10) {
      throw Error('Board length should be between 0 and 3');
    }
    return Array(size).fill([]).map(() => Array(size).fill(emptyField));
  },
  checkWinner: (board, move) => (
    validateDirection(board, move, horizontal)
    || validateDirection(board, move, vertical)
    || validateDirection(board, move, diagonalRight)
    || validateDirection(board, move, diagonalLeft)
  ),
};
