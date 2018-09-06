const evaluateRow = (row, player) => {
  const othersLength = row.filter(e => e !== player && e !== ' ').length;
  if (othersLength !== 0) {
    if (othersLength + 1 === row.length) {
      return 100;
    }
    return 0;
  }
  const playerLength = row.filter(e => e === player).length;
  return (playerLength ** 2);
};

module.exports = {
  evaluateLevel: (level, move) => {
    const player = level[move.row][move.col];
    let value = 0;
    const a = [];

    // horizontal
    level.forEach((row) => {
      a.push(evaluateRow(row, player));
      value += evaluateRow(row, player);
    });

    // vertical
    const trasposed = level[0].map((col, i) => level.map(row => row[i]));
    trasposed.forEach((row) => {
      a.push(evaluateRow(row, player));
      value += evaluateRow(row, player);
    });

    // diagonal
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < level.length; i++) {
      diagonal1.push(level[i][i]);
      diagonal2.push(level[i][i]);
    }
    a.push(evaluateRow(diagonal1, player));
    value += evaluateRow(diagonal1, value, player);
    a.push(evaluateRow(diagonal2, player));
    value += evaluateRow(diagonal2, value, player);
    level.forEach(row => console.log(row));
    console.log('================================', value);
    console.log('================================', a);
    return value;
  },
};
