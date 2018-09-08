# TIC-TAC-TOE 2.0
TIC-TAC-TOE 2.0 is a game similar to the world famous tic tac toe, with the difference that the game size is configurable and the number of players is 3. 

## Installation
### Requirements
* NodeJS (development was made in v8.11.4).
* NPM (develpment was made in v5.6.0). 

Download and extract the latest release of the game [here](https://github.com/jhonata11/tic-tac-toe-2/releases).

Another option is to use `git` to clone the repository:

`$ git clone https://github.com/jhonata11/tic-tac-toe-2.git`

## Usage
### Configurations
In the root of the game, there is a file called `gamesettings.json` with the tags:
* `players`: you can use to configure the name of the players. At the moment, the name should have the length of exactly 1 character. 

* `gameSize`: is a number between 3 and 10, which means the number of rows and columns that the game is going to have. 

### Gameplay
To start the game, simply run:

`$ npm start`

The game is going to open, showing the empty board and who is the current player. The board is a matrix with rows from `A` to `H` and columns from `0` to `9`, depending on the size you chose. 
With the game started, there are two commands available:

* `-exit`: use it to close the game. 
* `-m`: use it to make a move, selecting the row and the column. E.g. `-m B0`.

## Development
To run the tests you'll have first to install the test libraries.

`$ npm install`

Then, just run:

`$ npm run test`.