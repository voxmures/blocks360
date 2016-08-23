var gameoverState = function(game) {

};

function init(score) {
	this.score = score;
};

function create() {
	var game = this;

	var titleText = game.add.text(game.world.centerX, game.world.centerY - 55, 'Game Over', { font: '48px Arial', fill: '#000000', align: 'center' });
	titleText.anchor.set(0.5);

	var scoreTitleText = game.add.text(game.world.centerX, game.world.centerY, 'Your score', { font: '28px Arial', fill: '#000000', align: 'center' });
	scoreTitleText.anchor.set(0.5);

	var scoreText = game.add.text(game.world.centerX, game.world.centerY + 45, '' + game.score, { font: '36px Arial', fill: '#000000', align: 'center' });
	scoreText.anchor.set(0.5);

	var tapText = game.add.text(game.world.centerX, game.world.centerY + 90, 'Tap to restart', { font: '28px Arial', fill: '#000000', align: 'center' });
	tapText.anchor.set(0.5);

	game.input.onDown.add(game.start, this);
};

function start() {
	var game = this;
	game.state.start('play');
};

gameoverState.prototype = {
	init: init,
	create: create,
	start: start
};