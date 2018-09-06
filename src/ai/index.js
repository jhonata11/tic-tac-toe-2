const evaluator = require('./evaluator');

const availableBoards = (board, moves) => (
  moves.map((move) => {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = 'T';
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
  nextMove: (originalBoard) => {
    const tree = availableBoards(originalBoard, availableMoves(originalBoard));
    tree.sort((e1, e2) => e1.evaluation < e2.evaluation);
    return tree[0].move;
  },
};
