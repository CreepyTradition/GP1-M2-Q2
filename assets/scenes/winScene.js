export default class winScene extends Phaser.Scene {
  constructor() {
    super('winScene');
  }
  init(data) {
    this.score = data.score;
    this.time  = data.time;
  }
  create() {
    this.add.text(400, 300, 'You Win!', { fontSize: '48px', fill: '#0f0' }).setOrigin(0.5);
    this.add.text(400, 360, `Score: ${this.score}`,        { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 400, `Time: ${this.time}s`,          { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('gameScene'));
  }
}
