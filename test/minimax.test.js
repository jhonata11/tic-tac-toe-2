const { createBoard } = require('../src/controller/board');
const minimax = require('../src/controller/minimax');

describe.only('Minimax', () => {
  it('teste', () => {
    const board = createBoard(5);
    board[0][0] = 'X';
    minimax.nextMove(board);
  });
});
