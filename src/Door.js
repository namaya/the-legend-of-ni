
import { global } from './legend-of-ni.js'

class Door extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.game.physics.enable(this)

    this.body.allowGravity = false
  }

  open (nextState) {
    if (global.keyboard.ENTER.isDown) {
      this.game.state.start(nextState)
    }
  }
}

export default Door
