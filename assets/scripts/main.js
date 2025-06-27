import bootScene      from '../scenes/bootScene.js';
import gameScene      from '../scenes/gameScene.js';
import gameOverScene  from '../scenes/gameOverScene.js';
import winScene       from '../scenes/winScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ bootScene, gameScene, gameOverScene, winScene ]
};

const game = new Phaser.Game(config);
