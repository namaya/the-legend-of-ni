
class Spike extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.game.physics.enable(this)
    this.body.allowGravity = false

    this.body.setSize(this.width - 20, this.height - 20, 10, 10)
  }

  render () {
    this.game.debug.body(this)
  }
}

export default Spike
