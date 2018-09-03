/* eslint no-console: 0 */ // --> OFF
const readLine = require('readline');
const Game = require('./controller/game');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const colors = {
  cyan: text => `\x1b[36m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
};


const printBoard = (board) => {
  console.log(colors.cyan(`  ${[...letters].splice(0, board.length).join('   ')}`));
  board.forEach((row, i) => {
    const objects = row.map(colors.yellow);
    const linha = `| ${objects.join(' | ')} | ${colors.cyan(i)}`;
    console.log(linha);
  });
};

const teste = (input, game) => {
  const split = input.split('');
  const play = { row: parseInt(split[1], 10), col: letters.indexOf(split[0]) };
  try {
    const winner = game.makeMove(play);
    if (winner) {
      // TODO: do the winner thing
      console.log(`We have a winner: ${winner.player}`);
      process.exit();
    } else {
      printBoard(game.board);
      if (game.currentPlayer === 'T') {
        // computer turn
        console.log('======= COMPUTER TURN');
        game.makeMove({ row: 0, col: 0 });
        printBoard(game.board);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const game = new Game(5);
printBoard(game.board);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TIC-TAC-TOE> ',
});

rl.prompt();

rl.on('line', (line) => {
  const trim = line.trim();

  switch (trim) {
    case '--exit':
      process.exit(0);
      break;
    case '--undo':
      game.undoMove();
      printBoard(game.board);
      break;
    default:
      teste(trim, game);
      break;
  }
  rl.prompt();
}).on('close', () => process.exit(0));



// miniMax = (board, size) => {
//   const line = board.map((row, i) => row.filter((el, j) => e));
//   return { row: 0, col: 1 }
// }
