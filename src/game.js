var Game = function(game) {
	
};

var preload = function() {
	
};

var NUM_ROWS = 8,
	NUM_COLS = 12;
var board = [];

function generateBoard(game) {

	var DIAM_GUI = 75;	// The diameter of the gui. 
	var SIZE_ROW = (game.world.width/2 - DIAM_GUI)/NUM_ROWS,
		SIZE_COL = game.math.PI2/NUM_COLS;

	// Create the structure
	for (let i = 0; i < NUM_ROWS; i++) {
		board[i] = [];
		for (let j = 0; j < NUM_COLS; j++) {

			var g = game.add.graphics(game.world.centerX, game.world.centerY);
			g.lineStyle(SIZE_ROW, 0xFFFFFF, 1);
			g.arc(0, 0, game.world.width/2 - (i*SIZE_ROW + (SIZE_ROW/2)), SIZE_COL * j, SIZE_COL * (j + 1), false);
			var tint = game.rnd.integer() * 0xFFFFFF;
			g.tint = tint;

			board[i][j] = {
				graphic: g,
				tint: tint
			};
		}
	}
};

var create = function() {
	var game = this;
	game.stage.backgroundColor = '#FFFFFF';

	generateBoard(game);
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