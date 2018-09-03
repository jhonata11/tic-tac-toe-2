const possibleBoards = (board, moves) => (
  moves.map((move) => {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = 'T';
    return { board: newBoard, move };
  })
);

const evaluateLevel = level => Math.random();

const possibleMoves = (board) => {
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

const createBranches = (originalBoard) => {
  const newBoards = possibleBoards(originalBoard, possibleMoves(originalBoard));
  const leafes = newBoards.map(({ board, move }) => ({ evaluation: evaluateLevel(board), move, board }));
  const filhos = leafes.map(e => e.board).map(e => possibleBoards(e, possibleMoves(e)));
  console.log(filhos.ma);
};

module.exports = {
  nextMove: (originalBoard) => {
    createBranches(originalBoard);
  },
}