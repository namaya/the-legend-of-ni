
class Door extends Phaser.Sprite {
  constructor (game, x, y, texture, nextState) {
    super(game, x, y, texture, 0, nextState)

    this.game.physics.enable(this)

    this.body.allowGravity = false
  }
}

export default Door
