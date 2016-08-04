var Game = function(game) {

};

var preload = function() {
	
};

var create = function() {
	var game = this;
	
	game.stage.backgroundColor = '#FFFFFF';

	var NUM_ROWS = 8,
		NUM_COLS = 12;
	var DIAM_GUI = 75;	// The diameter of the gui. 

	var SIZE_ROW = (game.world.width/2 - DIAM_GUI)/NUM_ROWS,
		SIZE_COL = game.math.PI2/NUM_COLS;

	// Create the structure
	var i, j;
	var board = [];
	for (i = 0; i < NUM_ROWS; i++) {
		board[i] = [];
		for (j = 0; j < NUM_COLS; j++) {
			var g = game.add.graphics(game.world.centerX, game.world.centerY);
			g.lineStyle(SIZE_ROW, 0xFFFFFF, 1);
			g.arc(0, 0, game.world.width/2 - (i*SIZE_ROW + (SIZE_ROW/2)), SIZE_COL * j, SIZE_COL * (j + 1), false);
			g.tint = game.rnd.integer() * 0xFFFFFF;
			board[i][j] = g;
		}
	}
};

function rotate(direction) {
	console.log('Rotation ' + direction);
};

var update = function() {
	
};

Game.prototype = {
	preload: preload,
	create: create,
	update: update
};