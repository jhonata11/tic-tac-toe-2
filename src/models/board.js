const emptyField = ' ';

const horizontal = ({ move, index }) => ({ row: move.row, col: index });

const vertical = ({ move, index }) => ({ row: index, col: move.col });

const diagonalRight = ({ index }) => ({ row: index, col: index });

const diagonalLeft = ({ size, index }) => ({ row: index, col: size - index - 1 });


/**
 * Validate if a theres a winner on same direction in a specific board.
 * @param {array} board - the board to validate
 * @param {object} move - the move that is going to be made. with the patter { row, col }
 * @param {function} getCurrentPosition - a functiond that must return the coordinate of the
 *  next validation given an index.
 * @returns an object containing the player that won that game and the coordinates of the victory.
 */
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
  emptyField,
  createBoard: (size) => {
    if (size <= 0) {
      throw Error('Board size should be bigger than 1');
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
