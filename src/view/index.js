/* eslint no-console: 0 */ // --> OFF
const readLine = require('readline');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const colors = {
  blue: text => `\x1b[34m${text}\x1b[0m`,
  green: text => `\x1b[32m${text}\x1b[0m`,
  magenta: text => `\x1b[35m${text}\x1b[0m`,
  cyan: text => `\x1b[36m${text}\x1b[0m`,
  yellow: text => `\x1b[33m${text}\x1b[0m`,

  red: text => `\x1b[31m${text}\x1b[0m`,
};

const parseMove = (input) => {
  const match = /([A-H][0-9])/gm.test(input.toUpperCase());
  if (!match) return null;
  const split = input.split('');
  return { row: letters.indexOf(split[0]), col: parseInt(split[1], 10) };
};

const showCommands = () => {
  console.log(`${colors.yellow('-exit')} to close the game.`);
  console.log(`${colors.yellow('-m')} to make a move. e.g. ${colors.yellow('-m A1')}`);
};

module.exports = {
  showCurrentPlayer: (currentPlayerId, currentPlayer) => {
    const colorKeys = Object.keys(colors);
    console.log(`TURN: ${colors[colorKeys[currentPlayerId]](currentPlayer)}`);
  },
  showWinner: (message) => {
    console.log(`The winner is ${colors.green(message)}`);
  },
  printError: (message) => {
    console.log(`${colors.red('ERROR:')} ${message}`);
  },
  printBoard: (board, players) => {
    const colorKeys = Object.keys(colors);
    const playerColors = players.map((player, i) => ({ player, color: colors[colorKeys[i]] }));
    console.log(colors.cyan(`    ${Array.from(Array(board.length).keys()).join('   ')}`));
    board.forEach((row, i) => {
      const objects = row.map((val) => {
        const found = playerColors.find(({ player }) => player === val);
        return found ? found.color(found.player) : val;
      });
      const linha = `${colors.cyan(letters[i])} | ${objects.join(' | ')} |`;
      console.log(linha);
    });
  },
  start: (readMove) => {
    console.log(colors.cyan('[press enter for help]'));
    const cliInterface = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colors.magenta('TIC-TAC-TOE> '),
    });
    cliInterface.prompt();
    cliInterface.on('line', (line) => {
      const [command, move] = line.trim().split(' ');
      switch (command) {
        case '-exit':
          process.exit(0);
          break;
        case '-m':
          readMove(parseMove(move));
          break;
        default:
          showCommands();
          break;
      }
      cliInterface.prompt();
    });
    cliInterface.on('close', () => process.exit(0));
  },
};
