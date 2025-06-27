export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOverScene');
  }

  init(data) {
    this.score = data.score;
    this.time = data.time;
  }

  create() {
    this.add.text(200, 200, 'Game Over', { fontSize: '40px', fill: '#f00' });
    this.add.text(200, 250, `Score: ${this.score}`, { fontSize: '30px', fill: '#fff' });
    this.add.text(200, 290, `Time Survived: ${this.time}s`, { fontSize: '30px', fill: '#fff' });
    this.add.text(200, 350, 'Press SPACE to Retry', { fontSize: '25px', fill: '#fff' });

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('gameScene');
    });
  }
}
