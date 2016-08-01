var Game = function(game) {
	
};

var preload = function() {
	
};

var create = function() {
	var game = this;
	
	game.stage.backgroundColor = '#FFFFFF';
	var text = game.add.text(game.world.centerX, game.world.centerY, 'Hello, World!');
	text.anchor.set(0.5);
};

var update = function() {
	
};

Game.prototype = {
	preload: preload,
	create: create,
	update: update
};