const { expect } = require('chai');
const { createBoard } = require('../src/models/board');
const evaluator = require('../src/ai/evaluator');
const minimax = require('../src/ai');

describe('AI', () => {
  it('should return the next move', () => {
    const board = createBoard(10);
    board[0][0] = 'X';
    board[0][1] = 'O';
    const move = minimax.nextMove(board, ['X', 'O', 'T'], 'T');
    expect(move).to.eql({ row: 5, col: 1 });
  });

  describe('evaluator', () => {
    it('should return 100 in case of winning', () => {
      const board = [
        ['T', ' ', 'X'],
        ['X', 'T', 'X'],
        ['X', ' ', 'T'],
      ];
      const evaluation = evaluator.evaluateLevel(board, { row: 0, col: 0 });
      expect(evaluation).to.eql(100);
    });

    it('should return negative if all winning spots are occupied', () => {
      const board = [
        [' ', ' ', ' '],
        [' ', 'T', ' '],
        [' ', ' ', ' '],
      ];
      const evaluation = evaluator.evaluateLevel(board, { row: 0, col: 0 });
      expect(evaluation).to.be.below(0);
    });

    it('should return a negative value if other player is almost winning', () => {
      const board = [
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' '],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', ' ', ' '],
        ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ];

      const evaluation = evaluator.evaluateLevel(board, { row: 3, col: 7 });
      expect(evaluation).to.be.below(0);
    });
  });
});
