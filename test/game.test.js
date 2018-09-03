const { expect } = require('chai');
const Game = require('../src/game');

describe('--- game', () => {
  it('should create a default game', () => {
    const game = new Game();
    expect(game.board).to.have.length(5);
    expect(game.players).to.have.length(3);
    expect(game.currentPlayer).to.eql('X');
  });

  it('should create a custom game', () => {
    const game = new Game(3, ['T', 'F']);
    expect(game.board).to.have.length(3);
    expect(game.players).to.have.length(2);
    expect(game.currentPlayer).to.eql('T');
  });

  it('should make a move with the current player', () => {
    const game = new Game();
    game.makeMove({ row: 0, col: 0 });
    expect(game.board[0][0]).to.eql('X');

    game.makeMove({ row: 0, col: 1 });
    expect(game.board[0][1]).to.eql('O');
  });

  it('should save last move and board ', () => {
    const game = new Game();
    // assert first move
    game.makeMove({ row: 0, col: 0 });
    expect(game.states).to.have.length(2);
    expect(game.states[1].board).to.deep.equal(game.board);
    expect(game.states[1].move).to.deep.equal({ row: 0, col: 0 });
    expect(game.states[1].playerId).to.equal(0);

    // assert second move
    game.makeMove({ row: 0, col: 1 });
    expect(game.states[2].board).to.deep.equal(game.board);
    expect(game.states[2].move).to.deep.equal(game.lastMove);
    expect(game.states[2].playerId).to.equal(1);

    // assert last play was different from previous
    expect(game.states[2].board).to.not.deep.equal(game.states[1].board);
    expect(game.states[2].move).to.not.deep.equal(game.states[1].move);
    expect(game.states[2].playerId).to.not.equal(game.states[1].playerId);
  });

  it('should undo last move ', () => {
    const game = new Game();
    // assert first move
    game.makeMove({ row: 0, col: 0 });
    game.makeMove({ row: 0, col: 1 });
    game.undoMove();
    expect(game.states).to.have.length(2);
    expect(game.currentPlayerId).to.eql(1);
  });

  describe('Winning', () => {
    it('should return winner when winning move is made', () => {
      const moves = [0, 1, 2, 3];
      const game = new Game(5, ['X', 'T']);
      moves.forEach((col) => {
        game.makeMove({ row: 0, col });
        game.makeMove({ row: 2, col });
      });

      const winner = game.makeMove({ row: 0, col: 4 });
      expect(winner).to.eql({
        positions: [
          { row: 0, col: 0 },
          { row: 0, col: 1 },
          { row: 0, col: 2 },
          { row: 0, col: 3 },
          { row: 0, col: 4 },
        ],
        player: 'X',
      });
    });
  });

  describe('Exceptions', () => {
    it('should throw error if a move is repeated', () => {
      const game = new Game();
      const move = { row: 0, col: 0 };
      game.makeMove(move);
      expect(() => game.makeMove(move)).to.throw('Move already made');
    });

    it('should throw error if move is out of bounds', () => {
      const game = new Game();
      expect(() => game.makeMove({ row: 5, col: 0 })).to.throw('The move is invalid');
      expect(() => game.makeMove({ row: -1, col: 0 })).to.throw('The move is invalid');
      expect(() => game.makeMove({ row: 0, col: 5 })).to.throw('The move is invalid');
      expect(() => game.makeMove({ row: 0, col: -1 })).to.throw('The move is invalid');
    });
  });
});
