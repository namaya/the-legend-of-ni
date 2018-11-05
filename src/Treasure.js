
class Treasure extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.scale.setTo(0.1)
    this.game.physics.enable(this)
    this.body.allowGravity = false
  }
}

export default Treasure
