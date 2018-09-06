const {
  BLUE, GREEN, MAGENTA, CYAN, YELLOW, RED,
} = require('./colors');

module.exports = {
  [BLUE]: text => `\x1b[34m${text}\x1b[0m`,
  [GREEN]: text => `\x1b[32m${text}\x1b[0m`,
  [MAGENTA]: text => `\x1b[35m${text}\x1b[0m`,
  [CYAN]: text => `\x1b[36m${text}\x1b[0m`,
  [YELLOW]: text => `\x1b[33m${text}\x1b[0m`,
  [RED]: text => `\x1b[31m${text}\x1b[0m`,
};
