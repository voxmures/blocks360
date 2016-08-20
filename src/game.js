var Game = function(game) {
	
};

var preload = function() {
	
};

var DIAM_GUI = 50;	// The diameter of the gui. 
var NUM_ROWS = 8,
	NUM_COLS = 12;
var DELAY_BLOCK_GEN = Phaser.Timer.SECOND * 5,
	DELAY_BLOCK_FALL = Phaser.Timer.SECOND * 2;
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

	if (step + 1 == NUM_ROWS) { return; }
	step++; // Make a step, that is, keep falling.

	// TODO: Prepare throw method (show to user where will the block be throw)
	if (!board[NUM_ROWS - step - 1][column].isActive) { // Block can be thrown
		game.time.events.add(DELAY_BLOCK_FALL, moveBlock, game, step, column, tint);
	}
	else {
		// TODO: Ends game (?)
	}
};

function paintBlock(row, col, tint) {
	var block = board[row][col];
	block.isActive = true;
	block.tint = tint;
	block.graphic.tint = tint;
};

function eraseBlock(row, col) {
	var block = board[row][col];
	block.isActive = false;
	block.tint = 0xFFFFFF; 
	block.graphic.tint = 0xFFFFFF;
};

function rotate(direction) {
	if (direction !== 'CCW' && direction !== 'CW') { return console.error('Only "CCW" and "CW" values are allowed'); }
	for (let i = 0; i < NUM_ROWS; i++) {
		var row = board[i];

		var oldTint = row.slice(-1)[0].tint;
		for (let j = 0; j < NUM_COLS; j++) {
			
			var tint;
			if (direction === 'CW') {
				tint = oldTint;
				oldTint = row[j].tint;
			}
			else if (direction === 'CCW') {
				if (j == 0) { oldTint = row[j].tint; }
				
				if (j == row.length - 1) { tint = oldTint; }
				else { tint = row[j+1].tint; }		
			}

			row[j].tint = tint; row[j].graphic.tint = tint;
		}
	}
};

var update = function() {
	
};

Game.prototype = {
	preload: preload,
	create: create,
	update: update
};