const readLine = require('readline');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const colors = {
  cyan: text => `\x1b[36m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
  magenta: text => `\x1b[35m${text}\x1b[0m`,
};

const playerColors = {
  blue: text => `\x1b[44m${text}\x1b[0m`,
  green: text => `\x1b[42m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,
};

const parseMove = (input) => {
  const match = /([A-H][0-9])/gm.test(input);
  if (!match) return null;

  const split = input.split('');
  return { row: parseInt(split[1], 10), col: letters.indexOf(split[0]) };
};

module.exports = {
  printBoard: (board, lastMove, players, currentPlayer) => {
    const pColors = Object.keys(playerColors);
    const teste = players.map((player, i) => ({ player, color: playerColors[pColors[i]] }));


    console.log(colors.cyan(`  ${[...letters].splice(0, board.length).join('   ')}`));
    board.forEach((row, i) => {
      const objects = row.map((val, j) => {
        const encontrado = teste.find(player => player.player === val);
        return encontrado ? encontrado.color(encontrado.player) : val;
        // if (lastMove && lastMove.row === i && lastMove.col === j) {
        //   return colors.magenta(val);
        // }
        // return colors.yellow(val);
      });
      const linha = `| ${objects.join(' | ')} | ${colors.cyan(i)}`;
      console.log(linha);
    });
  },
  start: (startGame, readMove, undoMove) => {
    const cliInterface = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'TIC> ',
    });
    cliInterface.prompt();

    cliInterface.on('line', (line) => {
      const [command, move] = line.trim().split(' ');
      switch (command) {
        case '-exit':
          process.exit(0);
          break;
        case '-undo':
          undoMove();
          break;
        case '-start':
          startGame();
          break;
        case '-move':
          readMove(parseMove(move));
          break;
        default:
          console.log('Unknown command');
          break;
      }
      cliInterface.prompt();
    });
    cliInterface.on('close', () => process.exit(0));
  },
};


// const trim = line.trim();
// switch (trim) {
//   case '--exit':
//     process.exit(0);
//     break;
//   case '--undo':
//     // game.undoMove();
//     // printBoard(game.board);
//     break;
//   default:
//     // teste(trim, game);
//     break;
// }

