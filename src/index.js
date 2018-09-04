/* eslint no-console: 0 */ // --> OFF
const { readFileSync } = require('fs');
const Game = require('./models/game');
const cli = require('./view');


try {
  const { players, gameSize } = JSON.parse(readFileSync('./gamesettings.json', 'utf8'));
  if (!players || !gameSize) {
    throw Error('File wrong format');
  }
  const game = new Game(gameSize, players.map(({ name }) => name));

  const start = () => {
    game.start();
    cli.printBoard(game.board, game.lastMove, game.players, game.currentPlayer);
  };

  const readMove = (move) => {
    game.makeMove(move);
    cli.printBoard(game.board, game.lastMove, game.players, game.currentPlayer);
  };

  const undoMove = () => {
    if (game.states.length > 0) {
      game.undoMove();
      cli.printBoard(game.board);
    }
  };

  cli.start(start, readMove, undoMove);
  // const controller = new Controller(game, cli);
} catch (error) {
  console.log('gamesettings.json could not be found');
}
