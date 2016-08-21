var Game = function(game) {
	
};

var preload = function() {
	
};

var DIAM_GUI = 50;	// The diameter of the gui. 
var NUM_ROWS = 8,
	NUM_COLS = 12;
var DELAY_BLOCK_GEN = Phaser.Timer.SECOND * 2,
	DELAY_BLOCK_FALL = Phaser.Timer.SECOND * 1;
var blocks = [],
	board = [],
	graphics = [];

function generateBoard(game) {

	var SIZE_ROW = (game.world.width/2 - DIAM_GUI)/NUM_ROWS,
		SIZE_COL = game.math.PI2/NUM_COLS;

	// Create the structure
	for (let i = 0; i < NUM_ROWS; i++) {
		board[i] = [];
		graphics[i] = [];
		for (let j = 0; j < NUM_COLS; j++) {

			var g = game.add.graphics(game.world.centerX, game.world.centerY);
			g.lineStyle(SIZE_ROW, 0xFFFFFF, 1);
			g.arc(0, 0, game.world.width/2 - (i*SIZE_ROW + (SIZE_ROW/2)), SIZE_COL * j, SIZE_COL * (j + 1), false);

			board[i][j] = null;
			graphics[i][j] = g;
		}
	}
};

var create = function() {
	var game = this;
	game.stage.backgroundColor = '#FFFFFF';

	generateBoard(game);

	game.time.events.loop(DELAY_BLOCK_GEN, throwBlock, game);
};

function generateBlock(game, col) {
	var tint = game.rnd.integer() * 0xFFFFFF; // Set the color of the block.

	var block = {
		row: NUM_ROWS - 1,
		tint: tint,
		isFalling: true
	};
	var position = blocks.push(block) - 1;
	board[NUM_ROWS - 1][col] = blocks[position];
	return blocks[position];
};

function throwBlock() {
	var game = this;
	
	var column = game.rnd.integerInRange(0, NUM_COLS - 1); // Set the column where the block will fall.

	// TODO: Prepare throw method (show to user where will the block be throw)
	if (!board[NUM_ROWS - 1][column] != null) { // Block can be thrown
		var block = generateBlock(game, column);
		game.time.events.add(DELAY_BLOCK_FALL, moveBlock, game, block);
	}
	else {
		// TODO: Ends game (?)
	}
};

function findBlockColumn(block) {
	var column;
	for (let i = 0; i < NUM_ROWS; i++) {
		column = board[i].indexOf(block);
		if (column > -1) break;
	}
	return column;
};

function moveBlock(block) {
	var game = this;

	var row = block.row;
	var col = findBlockColumn(block);

	// The block has found another block in the next position.
	if (board[row - 1][col] != null && !board[row -1][col].isFalling) {
		block.isFalling = false;
		return;
	} 

	block.row = row - 1;
	board[row - 1][col] = block;
	board[row][col] = null;

	// The block has reached the last position in column.
	if (row - 1 == 0) {
		block.isFalling = false;
	}
	else {
		game.time.events.add(DELAY_BLOCK_FALL, moveBlock, game, block);
	}
};

function rotate(direction) {

	if (direction !== 'CW' && direction !== 'CCW') { 
		return console.error('Only "CCW" and "CW" values are allowed'); 
	}

	for (let i = 0; i < NUM_ROWS; i++) {
		var fixedBlocks = board[i].map(function(block) {
			return (block && block.isFalling ? null : block);
		});
		var fallingBlocks = board[i].map(function(block) {
			return (block && !block.isFalling ? null : block); 
		});

		if (direction === 'CW') { fixedBlocks.unshift(fixedBlocks.pop()); }
		else if (direction === 'CCW') { fixedBlocks.push(fixedBlocks.shift()); }

		var resultRow = [];
		for (let j = 0; j < fixedBlocks.length; j++) {
			if (fallingBlocks[j] && fixedBlocks[j] ) { // Collision detected!
				// WARNING: Possible collision between falling blocks in near future.
				if (direction === 'CW') { 
					if (j < NUM_COLS - 1) { fallingBlocks[j + 1] = fallingBlocks[j]; }
					else { resultsRow[0] = fallingBlocks[j]; }
				}
				else { 
					if (j > 0) { resultRow[j - 1] = fallingBlocks[j]; } 
					else { fallingBlocks[fallingBlocks.length - 1] = fallingBlocks[j]; }
				}
				resultRow.push(fixedBlocks[j]);
				continue;
			}
			else { resultRow.push(fallingBlocks[j] || fixedBlocks[j]); }	
		}
		board[i] = resultRow;
	}
};

var update = function() {
	for (let i = 0; i < NUM_ROWS; i++) {
		for (let j = 0; j < NUM_COLS; j++) {
			graphics[i][j].tint = (board[i][j] != null ? board[i][j].tint : 0xFFFFFF);
		}
	}
};

Game.prototype = {
	preload: preload,
	create: create,
	update: update
};