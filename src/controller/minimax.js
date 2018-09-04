
const evaluateLevel = (level, move) => {
  const player = level[move.row][move.col];
  let value = 0;

  const evaluateList = (row) => {
    const othersLength = row.filter(e => e !== player && e !== ' ').length;
    const playerLength = row.filter(e => e === player).length;
    if (othersLength + 1 === level.length) {
      value += 100;
    } else {
      value += (playerLength ** 2) - (othersLength ** 2);
    }
  };

  // horizontal
  level.forEach(evaluateList);

  // vertical
  const trasposed = level[0].map((col, i) => level.map(row => row[i]));
  trasposed.forEach(evaluateList);

  // diagonal
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < level.length; i++) {
    diagonal1.push(level[i][i]);
    diagonal2.push(level[i][i]);
  }
  evaluateList(diagonal1);
  evaluateList(diagonal2);
  return value;
};

const possibleBoards = (board, moves) => (
  moves.map((move) => {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = 'T';
    return { board: newBoard, move, evaluation: evaluateLevel(newBoard, move) };
  })
);

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

module.exports = {
  nextMove: (originalBoard) => {
    const tree = possibleBoards(originalBoard, possibleMoves(originalBoard));
    tree.sort((e1, e2) => e1.evaluation < e2.evaluation);
    return tree[0].move;
  },
};
