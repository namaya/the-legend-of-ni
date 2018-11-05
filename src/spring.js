class Spring extends Phaser.Sprite {
  constructor (game, x, y, texture, frame) {
    super(game, x, y, texture, frame)

    this.scale.setTo(0.5)

    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    this.body.allowGravity = false
    this.body.collideWorldBounds = true

    this.animations.add('bounce', [0, 1, 2, 3])

    this.animations.play('bounce', 10, true)
  }
}

export default Spring
