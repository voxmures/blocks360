var Game = function(game) {

};

var preload = function() {
	
};

var create = function() {
	var game = this;
	
	game.stage.backgroundColor = '#FFFFFF';
	
	var NUM_ROWS = 10,
		NUM_COLS = 12;

	// Create the structure
	var board = new Array(NUM_ROWS);
	for (var i = 0; i < NUM_ROWS; i++) {
		board[i] = new Array(NUM_COLS);
		for (var j = 0; j < NUM_COLS; j++) {
			board[i][j] = null;
		}
	}

	// Paint the board
	var SIZE_ROW = (game.world.width/2)/NUM_ROWS;
	var SIZE_COL = game.math.PI2/NUM_COLS;
	for (var i = 0; i < NUM_COLS; i++) {
		for (var j = NUM_ROWS; j > 0; j--) {
			var g = game.add.graphics(game.world.centerX, game.world.centerY);
			g.lineStyle(SIZE_ROW, 0xFFFFFF, 1);
			g.arc(0, 0, game.world.width/2 - j * (SIZE_ROW/2), SIZE_COL * i, SIZE_COL * (i + 1), false);
			g.tint = game.rnd.integer() * 0xFFFFFF;
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