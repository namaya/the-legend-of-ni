
class Bridge extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.game.physics.enable(this)

    this.body.allowGravity = false
    this.body.checkCollision.left = false
    this.body.checkCollision.right = false
    this.dropped = false
  }

  drop () {
    this.dropped = true
    this.body.allowGravity = true
  }
}

export default Bridge
