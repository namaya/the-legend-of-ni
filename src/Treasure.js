import { global } from './legend-of-ni.js'

class Treasure extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.scale.setTo(0.15)
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.opened = false
  }

  open () {
    this.opened = true
    global.sprites.xavier.replenishAmmo()
  }
}

export default Treasure
