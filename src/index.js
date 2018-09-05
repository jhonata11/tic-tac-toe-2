
const { readFileSync } = require('fs');
const cli = require('./view');
const Controller = require('./controller');

try {
  const { players, gameSize } = JSON.parse(readFileSync('./gamesettings.json', 'utf8'));
  if (!players || !gameSize) {
    throw Error('File wrong format');
  }
  const controller = new Controller(gameSize, players, cli);
  controller.start();
  cli.start(controller.readMove);
} catch (error) {
  cli.printError(error.message);
}
