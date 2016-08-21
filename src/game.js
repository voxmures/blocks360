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
var score = 0,
	scoreText = null;
var MAXSCORE_KEY = 'com.indiejuice.tetris360.MAX_SCORE';
var maxScore = 0,
	maxScoreText = null;

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

function initScore(game) {
	maxScore = localStorage.getItem(MAXSCORE_KEY) || 0;

	var text = game.add.text(game.world.centerX, game.world.centerY - 30, 'Score', { font: '18px Arial', fill: '#000000', align: 'center' });
	text.anchor.set(0.5);

	scoreText = game.add.text(game.world.centerX, game.world.centerY, '0', { font: '24px Arial', fill: '#000000', align: 'center' })
	scoreText.anchor.set(0.5);

	var text = game.add.text(game.world.centerX, game.world.centerY + 25, 'Max Score', { font: '12px Arial', fill: '#000000', align: 'center' });
	text.anchor.set(0.5);

	maxScoreText = game.add.text(game.world.centerX, game.world.centerY + 40, '' + maxScore, { font: '12px Arial', fill: '#000000', align: 'center' })
	maxScoreText.anchor.set(0.5);
};

var create = function() {
	var game = this;
	game.stage.backgroundColor = '#FFFFFF';

	initScore(game);
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

function endGame() {
	localStorage.setItem(MAXSCORE_KEY, maxScore);

	// TODO: End game!
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
		endGame();
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

function isRowFilled(row) {
	var count = board[row].reduce(function(sum, block) {
		return sum + (block && !block.isFalling);
	}, 0);
	return (count == NUM_COLS);
};

function handleFilledRow(game, row) {
	for (let i = 0; i < NUM_COLS; i++) {
		blocks.splice(blocks.indexOf(board[row][i]), 1);
		board[row][i] = null;

		for (let j = row + 1; j < NUM_ROWS; j++) {
			if (!board[j][i]) { break; }
			board[j - 1][i] = board[j][i];
			board[j][i] = null;
			board[j - 1][i].row = j - 1;
		}
	}

	updateScore();
};

function updateScore() {
	score += NUM_COLS * 10;
	scoreText.setText('' + score);

	if (score > maxScore) {
		maxScore = score;
		maxScoreText.setText('' + maxScore);
	}
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
		if (isRowFilled(0)) { handleFilledRow(game, 0); }
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