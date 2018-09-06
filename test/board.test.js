const { expect } = require('chai');
const Board = require('../src/models/board');


describe('--- createBoard', () => {
  it('should create the board with all fields set as blank space', () => {
    const size = 5;
    const board = Board.createBoard(size);
    expect(board).to.have.length(size);
    board.forEach((row) => {
      row.forEach(col => expect(col).to.equal(Board.emptyField));
      expect(row).to.have.length(size);
    });
  });

  it('should throw error if size is less than 1', () => {
    // error
    expect(() => Board.createBoard(0)).to.throw('Board size should be bigger than 1');
    // ok
    expect(() => Board.createBoard(1)).to.not.throw();
  });
});

describe('--- checkWinner', () => {
  it('should have a winner horizontally', () => {
    const rows = [0, 1, 2, 3, 4];
    rows.forEach((row) => {
      const board = Board.createBoard(5);
      board[row].fill('X');

      rows.forEach((col) => {
        const winner = Board.checkWinner(board, { row, col }, board.length);
        expect(winner).to.eql({
          positions: [
            { row, col: 0 },
            { row, col: 1 },
            { row, col: 2 },
            { row, col: 3 },
            { row, col: 4 },
          ],
          player: 'X',
        });
      });
    });
  });

  it('should have a winner vertically', () => {
    const columns = [0, 1, 2, 3, 4];
    columns.forEach((col) => {
      const board = Board.createBoard(5);
      /* eslint-disable */
      board.forEach(row => (row[col] = 'X'));
      /* eslint-enable */
      columns.forEach((row) => {
        const winner = Board.checkWinner(board, { row, col }, board.length);
        expect(winner.player).to.eql('X');

        expect(winner).to.eql({
          positions: [
            { row: 0, col },
            { row: 1, col },
            { row: 2, col },
            { row: 3, col },
            { row: 4, col },
          ],
          player: 'X',
        });
      });
    });
  });

  it('should have a winner diagonally to the right', () => {
    const indexes = [0, 1, 2, 3, 4];
    const board = Board.createBoard(5);
    indexes.forEach(i => (board[i][i] = 'X'));

    indexes.forEach((i) => {
      const winner = Board.checkWinner(board, { row: i, col: i }, board.length);
      expect(winner).to.eql({
        positions: [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
          { row: 2, col: 2 },
          { row: 3, col: 3 },
          { row: 4, col: 4 },
        ],
        player: 'X',
      });
    });
  });

  it('should have a winner diagonally to the left', () => {
    const indexes = [0, 1, 2, 3, 4];
    const board = Board.createBoard(5);
    indexes.forEach(i => (board[i][board.length - i - 1] = 'X'));
    indexes.forEach((i) => {
      const winner = Board.checkWinner(board, { row: i, col: board.length - i - 1 }, board.length);
      expect(winner).to.eql({
        positions: [
          { row: 0, col: 4 },
          { row: 1, col: 3 },
          { row: 2, col: 2 },
          { row: 3, col: 1 },
          { row: 4, col: 0 },
        ],
        player: 'X',
      });
    });
  });

  it('should not have a winner', () => {
    const row = 5;
    const board = Board.createBoard(10);
    board[row].fill('X');
    const winner1 = Board.checkWinner(board, { row: row - 1, col: 0 }, board.length);
    const winner2 = Board.checkWinner(board, { row: row + 1, col: 0 }, board.length);
    /* eslint-disable */
    expect(winner1).to.be.undefined;
    expect(winner2).to.be.undefined;
    /* eslint-enable */
  });
});
