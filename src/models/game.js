const { createBoard, checkWinner, emptyField } = require('./board');
const State = require('./state');

class Game {
  constructor(size = 5, players = ['X', 'O', 'T']) {
    this.size = size;
    this.players = players;
    this.currentPlayerId = 0;
    this.states = [];
  }

  get board() {
    return this.states[this.states.length - 1].board;
  }

  get lastMove() {
    return this.states[this.states.length - 1].move;
  }

  get currentPlayer() {
    return this.players[this.currentPlayerId];
  }

  start() {
    this.states = [new State(createBoard(this.size), null, null)];
    this.currentPlayerId = 0;
  }

  makeMove(move) {
    this.validateMove(move);
    const newBoard = this.board.map(row => [...row]);
    newBoard[move.row][move.col] = this.players[this.currentPlayerId];
    this.states.push(new State(newBoard, move, this.currentPlayerId));
    this.currentPlayerId = (this.currentPlayerId + 1) % this.players.length;
    return checkWinner(this.board, move);
  }

  undoMove() {
    if (this.states.length !== 1) {
      this.states.pop();
      this.currentPlayerId = Math.abs(this.currentPlayerId - 1) % this.players.length;
    }
  }

  validateMove(move) {
    if ((move.row >= this.size || move.row < 0) || (move.col >= this.size || move.col < 0)) {
      throw new Error('The move is invalid');
    }
    if (this.board[move.row][move.col] !== emptyField) {
      throw new Error('Move already made');
    }
  }
}

module.exports = Game;
