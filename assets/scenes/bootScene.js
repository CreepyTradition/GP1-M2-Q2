export default class bootScene extends Phaser.Scene {
  constructor() {
    super('bootScene');
  }

  create() {
    this.scene.start('gameScene');
  }
}
