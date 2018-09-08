const AI = require('../ai');
const Game = require('../models/game');

/**
  * A controller for the game tic tac toe 2.0
  * @constructor
  * @param {object} view - a view instance
  */
class Controller {
  constructor(view) {
    this.gameSize = 0;
    this.players = [];
    this.view = view;
    this.game = null;

    // method binding
    this.start = this.start.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.readMove = this.readMove.bind(this);
  }

  /**
  * Starts a new game.
  * @param {integer} gameSize - The size of the board.
  * @param {array} players - Array of string containing the players.
  */
  start(gameSize, players) {
    this.gameSize = gameSize;
    this.players = players;
    this.validateGame();
    this.game = new Game(this.gameSize, this.players.map(({ name }) => name));
    this.view.showBoard(this.game.board, this.game.players);
    this.view.showCurrentPlayer(this.game.currentPlayerId, this.game.currentPlayer);
  }

  handleWin(winner) {
    this.view.showBoard(this.game.board, this.game.players);
    this.view.notifyWinner(winner.player);
  }


  /**
  * Handles the input of a move, updating the view or, if the next player is an AI,
  * calling itself recursivally.
  * @param {object} move - the given move.
  *  @param {function} handleWin - a function called when a player wins.
  */
  readMove(move, handleWin) {
    try {
      const winner = this.game.makeMove(move);
      if (winner) {
        this.handleWin(winner);
        handleWin();
      } else {
        const nextPlayer = this.players[this.game.currentPlayerId];
        if (nextPlayer.computer) {
          this.readMove(AI.nextMove(this.game.board, this.game.currentPlayer));
        } else {
          this.view.showBoard(this.game.board, this.game.players);
          this.view.showCurrentPlayer(this.game.currentPlayerId, this.game.currentPlayer);
        }
      }
    } catch (e) {
      this.view.notifyError(e.message);
    }
  }

  validateGame() {
    if (this.gameSize < 3 || this.gameSize > 10) {
      throw Error('Board length should be between 3 and 10');
    }
    if (this.players.length !== 3) {
      throw Error('The number of players should be 3');
    }
    if (!this.players.every(player => player.name)) {
      throw Error('All players must have a name');
    }
    if (!this.players.every(player => player.name.length === 1)) {
      throw Error('All players must have a name with length 1');
    }
    if (this.players.filter(player => player.computer).length !== 1) {
      throw Error('One of the players must be a computer');
    }
  }
}

module.exports = Controller;
