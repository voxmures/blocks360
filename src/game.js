var Game = function(game) {
	
};

var preload = function() {
	
};

var DIAM_GUI = 50;	// The diameter of the gui. 
var NUM_ROWS = 8,
	NUM_COLS = 12;
var DELAY_BLOCK_GEN = Phaser.Timer.SECOND * 2,
	DELAY_BLOCK_FALL = Phaser.Timer.SECOND * 1;
var board = [];

function generateBoard(game) {

	var SIZE_ROW = (game.world.width/2 - DIAM_GUI)/NUM_ROWS,
		SIZE_COL = game.math.PI2/NUM_COLS;

	// Create the structure
	for (let i = 0; i < NUM_ROWS; i++) {
		board[i] = [];
		for (let j = 0; j < NUM_COLS; j++) {

			var g = game.add.graphics(game.world.centerX, game.world.centerY);
			g.lineStyle(SIZE_ROW, 0xFFFFFF, 1);
			g.arc(0, 0, game.world.width/2 - (i*SIZE_ROW + (SIZE_ROW/2)), SIZE_COL * j, SIZE_COL * (j + 1), false);

			board[i][j] = {
				graphic: g,
				isActive: false,
				isFalling: false,
				tint: 0xFFFFFF
			};
		}
	}
};

var create = function() {
	var game = this;
	game.stage.backgroundColor = '#FFFFFF';

	generateBoard(game);

	game.time.events.loop(DELAY_BLOCK_GEN, throwBlock, game);
};

function throwBlock() {
	var game = this;
	
	var tint = game.rnd.integer() * 0xFFFFFF; // Set the color of the block.
	var column = game.rnd.integerInRange(0, NUM_COLS - 1); // Set the column where the block will fall.

	// TODO: Prepare throw method (show to user where will the block be throw)
	if (!board[NUM_ROWS - 1][column].isActive) { // Block can be thrown
		game.time.events.add(DELAY_BLOCK_FALL, moveBlock, game, 0, column, tint);
	}
	else {
		// TODO: Ends game (?)
	}
};

function moveBlock(step, column, tint) {
	var game = this;

	if (step != 0) { eraseBlock(NUM_ROWS - step, column); }
	paintBlock(NUM_ROWS - step - 1, column, tint);
	board[NUM_ROWS - step - 1][column].isFalling = true; // Mark it as a falling block.

	if (step + 1 == NUM_ROWS) { 
		board[NUM_ROWS - step - 1][column].isFalling = false; 
		return; 
	}
	step++; // Make a step, that is, keep falling.

	if (!board[NUM_ROWS - step - 1][column].isActive) { // Block can be thrown
		game.time.events.add(DELAY_BLOCK_FALL, moveBlock, game, step, column, tint);
	}
	else {
		board[NUM_ROWS - step][column].isFalling = false; // Mark it as a still block.
	}
};

function paintBlock(row, col, tint) {
	var block = board[row][col];
	block.isActive = true;
	block.tint = tint;
	block.graphic.tint = tint;
};

function eraseBlock(row, col) {
	if (col == -1) { col = NUM_COLS - 1; }
	var block = board[row][col];
	block.isActive = false;
	block.isFalling = false;
	block.tint = 0xFFFFFF; 
	block.graphic.tint = 0xFFFFFF;
};

function rotate(direction) {
	if (direction === 'CW') {
		for (let i = 0; i < NUM_ROWS; i++) {
			var block = board[i][NUM_COLS - 1];
			var oldTint = block.tint,
				allowMove = (block.isActive && !block.isFalling),
				wasPainted = false;
			for (let j = NUM_COLS - 1; j >= 0; j--) {
				if (j == 0) {
					if (allowMove) {
						if (!wasPainted) { eraseBlock(i, -1); }
						paintBlock(i, j, oldTint);
					}
					continue;
				}

				var nextBlock = board[i][j - 1];
				if (nextBlock.isActive && !nextBlock.isFalling) {
					if (j == NUM_COLS - 1) { wasPainted = true;}
					paintBlock(i, j, nextBlock.tint);
					eraseBlock(i, j - 1);
				}
			}
		}
	}
	else if (direction === 'CCW') {
		for (let i = 0; i < NUM_ROWS; i++) {
			var block = board[i][0];
			var oldTint = block.tint,
				allowMove = (block.isActive && !block.isFalling),
				wasPainted = false;
			for (let j = 0; j < NUM_COLS; j++) {
				if (j == NUM_COLS - 1) {
					if (allowMove) {
						if (!wasPainted) { eraseBlock(i, 0); }
						paintBlock(i, j, oldTint);
					}
					continue;
				}

				var nextBlock = board[i][j + 1];
				if (nextBlock.isActive && !nextBlock.isFalling) {
					if (j == 0) { wasPainted = true;}
					paintBlock(i, j, nextBlock.tint);
					eraseBlock(i, j + 1);
				}
			}
		}
	}
	else { return console.error('Only "CCW" and "CW" values are allowed'); }
};

var update = function() {
	
};

Game.prototype = {
	preload: preload,
	create: create,
	update: update
};