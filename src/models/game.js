const { createBoard, checkWinner, emptyField } = require('./board');

/**
 * Represents a game of tic tac toe 2.0
 * @constructor
 * @param {integer} size - The size of the board.
 * @param {array} players - Array of string containing the players.
 */
class Game {
  constructor(size = 5, players = ['X', 'O', 'T']) {
    this.size = size;
    this.players = players;
    this.board = createBoard(this.size);
    this.currentPlayerId = 0;
  }

  get currentPlayer() {
    return this.players[this.currentPlayerId];
  }

  /**
   * Proceed a move on the game.
   * @param {object} move - the move that is going to be made. with the patter { row, col }
   * @returns an object containing the player that won that game and the coordinates of the victory.
   */
  makeMove(move) {
    this.validateMove(move);
    const newBoard = this.board.map(row => [...row]);
    newBoard[move.row][move.col] = this.players[this.currentPlayerId];
    this.board = newBoard;
    this.currentPlayerId = (this.currentPlayerId + 1) % this.players.length;
    return checkWinner(this.board, move);
  }

  validateMove(move) {
    if (!move || !Number.isInteger(move.row) || !Number.isInteger(move.col)) {
      throw new Error('The move is invalid');
    }
    if ((move.row >= this.size || move.row < 0) || (move.col >= this.size || move.col < 0)) {
      throw new Error('The move is invalid');
    }
    if (this.board[move.row][move.col] !== emptyField) {
      throw new Error('Move already made');
    }
  }
}

module.exports = Game;
