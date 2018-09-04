const { nextMove } = require('../ai/minimax');

const resumePlay = (move, game) => {
  try {
    const winner = game.makeMove(move);
    if (winner) {
      // TODO: do the winner thing
      console.log(`We have a winner: ${winner.player}`);
      process.exit();
    } else {
      printBoard(game.board);
      if (game.currentPlayer === 'T') {
        // computer turn
        game.makeMove(nextMove(game.board));
        printBoard(game.board);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.startGame();
  }

  resumePlay(move) {
    try {
      const winner = this.game.makeMove(move);
      if (winner) {
        process.exit();
      } else {
        this.view.showBoard(this.game.board);
        // if (game.currentPlayer === 'T') {
        //   // computer turn
        //   game.makeMove(nextMove(game.board));
        //   printBoard(game.board);
        // }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Controller;
