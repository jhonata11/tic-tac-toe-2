
const { readFileSync } = require('fs');
const cli = require('./view');
const Controller = require('./controller');

try {
  const { players, gameSize } = JSON.parse(readFileSync('./gamesettings.json', 'utf8'));
  if (!Array.isArray(players) || !Number.isInteger(gameSize)) {
    throw Error('Settings file wrong format');
  }
  const controller = new Controller(cli);
  controller.start(gameSize, players);
  cli.start(controller.readMove);
} catch (error) {
  cli.notifyError(error.message);
}
