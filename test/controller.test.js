/* eslint no-unused-expressions: 0 */ // --> OFF
const { expect } = require('chai');
const sinon = require('sinon');
const AI = require('../src/ai');
const Controller = require('../src/controller');

// const emptyFunction = e => e;
const player = (name, computer = false) => ({ name, computer });

describe('Controller tests', () => {
  let controller = null;
  let cli = null;

  beforeEach(async () => {
    cli = {
      showCurrentPlayer: sinon.fake(),
      notifyWinner: sinon.fake(),
      notifyError: sinon.fake(),
      showBoard: sinon.fake(),
    };
    controller = new Controller(cli);
  });


  it('should start a game', () => {
    controller.start(5, [player('A'), player('B'), player('C', true)]);
    expect(controller.game).to.not.be.null;
    expect(controller.gameSize).to.eql(5);
    expect(controller.players).to.have.length(3);
  });

  describe('gameplay', () => {
    it('should change game when a move is read', () => {
      controller.start(3, [player('A'), player('B'), player('C', true)]);
      controller.readMove({ row: 0, col: 0 });
      expect(controller.game.board[0][0]).to.eql('A');
      // validate functions called
      expect(cli.showBoard.called).to.be.true;
      expect(cli.showCurrentPlayer.called).to.be.true;
    });

    it('should change call AI automatically when is their turn', () => {
      controller.start(3, [player('A'), player('B'), player('C', true)]);
      controller.readMove({ row: 0, col: 0 });
      controller.readMove({ row: 0, col: 1 });

      expect(cli.showBoard.callCount).to.eql(3);
      // should not display next player when is AI turn
      expect(cli.showCurrentPlayer.callCount).to.eql(2);
    });

    it('should notify on invalid movement', () => {
      controller.start(3, [player('A'), player('B'), player('C', true)]);
      controller.readMove({ row: 'invalid', col: 0 });
      expect(cli.notifyError.called).to.be.true;
    });

    it('should notify in case of a winner', () => {
      const stubAi = sinon.stub(AI, 'nextMove');
      stubAi.onCall(0).returns({ row: 2, col: 0 });
      stubAi.onCall(1).returns({ row: 2, col: 1 });

      controller.start(3, [player('A'), player('B'), player('C', true)]);
      controller.readMove({ row: 0, col: 0 });
      controller.readMove({ row: 1, col: 0 });

      controller.readMove({ row: 0, col: 1 });
      controller.readMove({ row: 1, col: 1 });
      stubAi.restore();

      controller.readMove({ row: 0, col: 2 });
      expect(cli.notifyWinner.called).to.be.true;
    });
  });

  describe('validations', () => {
    it('should throw error on invalid game sizes', () => {
      const players = [player('A'), player('B'), player('C', true)];

      // error
      expect(() => controller.start(2, players)).to.throw('Board length should be between 3 and 10');
      expect(() => controller.start(11, players)).to.throw('Board length should be between 3 and 10');
      // ok
      expect(() => controller.start(3, players)).to.not.throw();
      expect(() => controller.start(10, players)).to.not.throw();
    });

    it('should throw error on invalid player length', () => {
      const players = [player('A'), player('B'), player('C', true)];

      expect(() => controller.start(5, [...players, player('S')])).to.throw('The number of players should be 3');
      expect(() => controller.start(5, [...players].splice(0, 2))).to.throw('The number of players should be 3');
      expect(() => controller.start(5, players)).to.not.throw();
    });

    it('should throw error if one of the players dont have a name', () => {
      const players = [player('A'), player('B'), player('C', true)];
      const firstWithoutName = [player(), player('B'), player('C', true)];
      const secondWithoutName = [player('A'), player(), player('C', true)];
      const thirdWithoutName = [player('A'), player(), player('', true)];

      expect(() => controller.start(5, firstWithoutName)).to.throw('All players must have a name');
      expect(() => controller.start(5, secondWithoutName)).to.throw('All players must have a name');
      expect(() => controller.start(5, thirdWithoutName)).to.throw('All players must have a name');
      expect(() => controller.start(5, players)).to.not.throw();
    });

    it('should throw error if one of the players have a large name', () => {
      const players = [player('A'), player('B'), player('C', true)];
      const firstLargeName = [player('big name'), player('B'), player('C', true)];
      const secondLarge = [player('A'), player('big name'), player('C', true)];
      const thirdLargeName = [player('A'), player('B'), player('big name', true)];

      expect(() => controller.start(5, firstLargeName)).to.throw('All players must have a name with length 1');
      expect(() => controller.start(5, secondLarge)).to.throw('All players must have a name with length 1');
      expect(() => controller.start(5, thirdLargeName)).to.throw('All players must have a name with length 1');
      expect(() => controller.start(5, players)).to.not.throw();
    });

    it('should throw error if one of the players is not a computer', () => {
      const players = [player('A'), player('B'), player('C', true)];
      const zeroComputer = [player('A'), player('B'), player('C')];
      const twoComputers = [player('A'), player('B', true), player('C', true)];

      expect(() => controller.start(5, zeroComputer)).to.throw('One of the players must be a computer');
      expect(() => controller.start(5, twoComputers)).to.throw('One of the players must be a computer');
      expect(() => controller.start(5, players)).to.not.throw();
    });
  });
});
