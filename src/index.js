const Game = require('./game');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const printBoard = (board) => {
  console.log(`  ${[...letters].splice(0, board.length).join('   ')}`);
  board.forEach((row, i) => {
    const linha = `| ${row.join(' | ')} | ${i}`;
    console.log(linha)
  })
}

const a = new Game(5);
a.makeMove({ row: 0, col: 0 });
console.log(' ')
console.log('-------------------------------')
printBoard(a.board);
a.makeMove({ row: 1, col: 1 });
console.log(' ')
console.log('-------------------------------')
printBoard(a.board);
a.makeMove({ row: 2, col: 3 });
console.log(' ')
console.log('-------------------------------')
printBoard(a.board);





// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


// rl.on('line', (input) => {
//   const split = input.split('');
//   const col = letters.indexOf(split[0]);
//   const play = { row: parseInt(split[1], 10), col }
//   board[play.row][play.col] = 'X'
//   printBoard(board);
// });

