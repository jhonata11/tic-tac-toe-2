const { expect } = require('chai');
const { createBoard } = require('../src/models/board');
const evaluator = require('../src/ai/evaluator');
const minimax = require('../src/ai');

describe('Minimax', () => {
  it('T1', () => {
    const board = createBoard(3);
    board[0][0] = 'X';
    board[0][1] = 'O';
    const move = minimax.nextMove(board, ['X', 'O', 'T'], 'T');
    expect(move).to.eql({ row: 1, col: 1 });
  });

  describe('evaluator', () => {
    it('should return 100 in case of winning', () => {
      const board = createBoard(3);
      board[0][0] = 'X';
      board[0][1] = 'X';
      board[0][2] = 'X';
      board[1][1] = 'T';
      board[2][1] = 'T';
      const evaluation = evaluator.evaluateLevel(board, { row: 0, col: 1 });
      expect(evaluation).to.eql(100);
    });

    it('should return 0 if is not empty row', () => {
      const board = createBoard(3);
      board[1][1] = 'T';
      const evaluation = evaluator.evaluateLevel(board, { row: 0, col: 0 });
      expect(evaluation).to.eql(0);
    });
  });
});
