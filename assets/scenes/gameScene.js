export default class gameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('projectile', 'assets/images/projectile.png');
    this.load.image('obstacle', 'assets/images/obstacle.png');
    this.load.audio('bgm', 'assets/audio/background.mp3');
    this.load.audio('shoot', 'assets/audio/shoot.mp3');
    this.load.audio('hit', 'assets/audio/hit.mp3');
  }

  create() {
    this.add.image(0, 0, 'background')
    .setOrigin(0, 0)
    .setDisplaySize(this.scale.width, this.scale.height);

    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.3 });
    this.shootSound = this.sound.add('shoot');
    this.hitSound = this.sound.add('hit');
    this.bgm.play();

    this.player = this.physics.add.sprite(400, 550, 'player').setCollideWorldBounds(true);

    this.projectiles = this.physics.add.group();
    this.obstacles = this.physics.add.group();

    this.score = 0;
    this.timeSurvived = 0;
    this.startTime = this.time.now;

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
    this.timeText = this.add.text(10, 35, 'Time: 0s', { fontSize: '20px', fill: '#fff' });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.overlap(this.projectiles, this.obstacles, this.handleProjectileHit, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.handlePlayerHit, null, this);

    this.spawnObstacle();
    this.obstacleTimer = this.time.addEvent({ delay: 1000, callback: this.spawnObstacle, callbackScope: this, loop: true });
  }

  update(time, delta) {
    this.timeSurvived = Math.floor((time - this.startTime) / 1000);
    this.timeText.setText(`Time: ${this.timeSurvived}s`);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.fireProjectile();
    }

    this.obstacles.children.iterate(obstacle => {
      if (obstacle.y > 600) {
        obstacle.destroy();
        this.spawnObstacle();
      }
    });

    if (this.timeSurvived >= 120) {
      this.scene.start('WinScene', { score: this.score });
    }
  }

  fireProjectile() {
    const projectile = this.projectiles.create(this.player.x, this.player.y - 20, 'projectile');
    projectile.setVelocityY(-400);
    this.shootSound.play();
  }

  spawnObstacle() {
    const x = Phaser.Math.Between(50, 1280);
    const obstacle = this.obstacles.create(x, 0, 'obstacle');
    obstacle.setVelocityY(200 + Phaser.Math.Between(0, 100));
  }

  handleProjectileHit(projectile, obstacle) {
    projectile.destroy();
    obstacle.destroy();
    this.hitSound.play();
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    this.spawnObstacle();
  }

  handlePlayerHit(player, obstacle) {
    this.physics.pause();
    this.bgm.stop();
    this.scene.start('gameOverScene', { score: this.score, time: this.timeSurvived });
  }
}