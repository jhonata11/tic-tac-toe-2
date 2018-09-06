const Board = require('../models/board');

const evaluateRow = (row, player) => {
  const unempty = row.filter(e => e !== Board.emptyField);
  const others = unempty.filter(e => e !== player);
  if (others.length !== 0) {
    return 0;
  }
  const playerLength = unempty.filter(e => e === player).length;
  return (playerLength ** 2);
};

module.exports = {
  evaluateLevel: (level, move) => {
    if (Board.checkWinner(level, move)) {
      return 100;
    }

    const player = level[move.row][move.col];
    let value = 0;

    // horizontal
    level.forEach((row) => {
      value += evaluateRow(row, player);
    });

    // vertical
    const trasposed = level[0].map((col, i) => level.map(row => row[i]));
    trasposed.forEach((row) => {
      value += evaluateRow(row, player);
    });

    // diagonal
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < level.length; i++) {
      diagonal1.push(level[i][i]);
      diagonal2.push(level[i][i]);
    }
    value += evaluateRow(diagonal1, value, player);
    value += evaluateRow(diagonal2, value, player);

    return value;
  },
};
