const AI = require('../ai');
const Game = require('../models/game');

class Controller {
  constructor(gameSize, players, view) {
    this.gameSize = gameSize;
    this.players = players;
    this.view = view;
    this.game = null;

    // method binding
    this.start = this.start.bind(this);
    this.dealWithVictory = this.dealWithVictory.bind(this);
    this.readMove = this.readMove.bind(this);
  }

  start() {
    this.game = new Game(this.gameSize, this.players.map(({ name }) => name));
    this.view.showBoard(this.game.board, this.game.players);
  }

  dealWithVictory(winner) {
    this.view.showBoard(this.game.board, this.game.players);
    this.view.notifyWinner(winner.player);
    process.exit(0);
  }

  readMove(move) {
    try {
      const winner = this.game.makeMove(move);
      if (winner) {
        this.dealWithVictory(winner);
      } else {
        const nextPlayer = this.players[this.game.currentPlayerId];
        if (nextPlayer.human) {
          this.view.showBoard(this.game.board, this.game.players);
          this.view.showCurrentPlayer(this.game.currentPlayerId, this.game.currentPlayer);
        } else {
          this.readMove(AI.nextMove(this.game.board));
        }
      }
    } catch (e) {
      this.view.notifyError(e.message);
    }
  }
}

module.exports = Controller;
