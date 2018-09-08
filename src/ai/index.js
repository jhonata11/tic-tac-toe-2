const evaluator = require('./evaluator');

const availableBoards = (board, moves, player) => (
  moves.map((move) => {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = player;
    return { board: newBoard, move, evaluation: evaluator.evaluateLevel(newBoard, move) };
  })
);

const availableMoves = (board) => {
  const moves = [];
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === ' ') {
        moves.push({ row: i, col: j });
      }
    });
  });
  return moves;
};

module.exports = {
  nextMove: (originalBoard, player) => {
    const evaluated = availableBoards(originalBoard, availableMoves(originalBoard), player);
    evaluated.sort((e1, e2) => e1.evaluation < e2.evaluation);
    return evaluated[0].move;
  },
};
