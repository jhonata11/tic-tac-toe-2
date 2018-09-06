/* eslint no-console: 0 */ // --> OFF
const readLine = require('readline');
const colorizer = require('./colorizer');
const alphabet = require('./alphabet');
const {
  BLUE, GREEN, MAGENTA, CYAN, YELLOW, RED,
} = require('./colors');

const parseMove = (input) => {
  const match = /([a-z][0-9])/ig.test(input);
  if (!match) return null;
  const split = input.split('');
  return { row: alphabet.indexOf(split[0].toUpperCase()), col: parseInt(split[1], 10) };
};

const showCommands = () => {
  console.log(`${colorizer[YELLOW]('-exit')} to close the game.`);
  console.log(`${colorizer[YELLOW]('-m')} to make a move. e.g. ${colorizer[YELLOW]('-m A1')}`);
};

module.exports = {
  showCurrentPlayer: (currentPlayerId, currentPlayer) => {
    const colorKeys = Object.keys(colorizer);
    console.log(`TURN: ${colorizer[colorKeys[currentPlayerId]](currentPlayer)}`);
  },

  notifyWinner: (message) => {
    console.log(`The winner is ${colorizer[GREEN](message)}`);
  },

  notifyError: (message) => {
    console.log(`${colorizer[RED]('ERROR:')} ${message}`);
  },

  showBoard: (board, players) => {
    const colorKeys = Object.keys(colorizer);
    const playercolor = players.map((player, i) => ({ player, color: colorizer[colorKeys[i]] }));
    console.log(colorizer[CYAN](`    ${Array.from(Array(board.length).keys()).join('   ')}`));
    board.forEach((row, i) => {
      const objects = row.map((val) => {
        const found = playercolor.find(({ player }) => player === val);
        return found ? found.color(found.player) : val;
      });
      const linha = `${colorizer[CYAN](alphabet[i])} | ${objects.join(' | ')} |`;
      console.log(linha);
    });
  },

  start: (readMove) => {
    console.log(colorizer[BLUE]('[press enter for help]'));
    const cliInterface = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colorizer[MAGENTA]('TIC-TAC-TOE> '),
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
