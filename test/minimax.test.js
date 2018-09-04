const { expect } = require('chai');
const { createBoard } = require('../src/models/board');
const minimax = require('../src/controller/minimax');

describe('Minimax', () => {
  it('teste', () => {
    const board = createBoard(3);
    board[0][0] = 'X';
    const move = minimax.nextMove(board);
    expect(move).to.eql({ row: 1, col: 1 });
  });

  it('T2', () => {
    const board = createBoard(3);
    board[1][1] = 'X';
    board[0][0] = 'T';
    board[0][1] = 'X';
    const move = minimax.nextMove(board);
    expect(move).to.eql({ row: 2, col: 2 });
  });
});
