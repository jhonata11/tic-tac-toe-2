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

const createTree = (board, players, player, depth = 0) => {
  const current = players[(players.indexOf(player) + depth) % players.length];
  const evaluatedMoves = availableBoards(board, availableMoves(board), current);
  const child = new Map();
  evaluatedMoves.forEach(el => child.set(JSON.stringify(el.move), el));

  if (depth < 2) {
    child.forEach((node) => {
      node.child = createTree(node.board, players, player, depth + 1);
    });
  }
  return child;
};

const getBestMoveFromTree = (tree) => {
  const paths = [];
  [...tree.keys()].forEach((key1) => {
    const level1 = tree.get(key1);
    [...level1.child.keys()].forEach((key2) => {
      const level2 = level1.child.get(key2);
      [...level2.child.keys()].forEach((key3) => {
        const level3 = level2.child.get(key3);
        paths.push({
          path: key1,
          evaluation: (level1.evaluation - level2.evaluation - level3.evaluation),
        });
      });
    });
  });
  paths.sort((e1, e2) => e1.evaluation - e2.evaluation);
  return paths[0];
};


module.exports = {
  nextMove: (originalBoard, players, player) => {
    const tree = createTree(originalBoard, players, player);
    const nextMove = getBestMoveFromTree(tree);
    return JSON.parse(nextMove.path);
  },
};
