var menuState = function(game) {

};

function create() {
	var game = this;

	game.stage.backgroundColor = '#FFFFFF';

	var titleText = game.add.text(game.world.centerX, game.world.centerY - 55, 'Blocks360', { font: '54px Arial', fill: '#000000', align: 'center' });
	titleText.anchor.set(0.5);

	var tapText = game.add.text(game.world.centerX, game.world.centerY + 50, 'Tap to start', { font: '28px Arial', fill: '#000000', align: 'center' });
	tapText.anchor.set(0.5);

	game.input.onDown.add(game.start, this);
};

function start() {
	var game = this;
	game.state.start('play');
};

menuState.prototype = {
	create: create,
	start: start
};