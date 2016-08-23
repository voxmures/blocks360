var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'main');

game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('menu');