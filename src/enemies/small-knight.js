
import settings from '../../conf/legend-of-ni.conf.js'

class SmallKnight extends Phaser.Sprite {
  constructor (game, x, y, texture, frame) {
    super(game, x, y, texture, frame)

    game.physics.enable(this)

    this.scale.setTo(0.5)

    this.animations.add('walk-left', [5, 6, 7, 8])
    this.animations.add('walk-right', [0, 1, 2, 3])

    // Initial Game State
    this.animations.play('walk-right', 6, true)
    this.isFacingRight = true
    this.health = 3
  }

  update () {
  }

  damage () {
    this.health -= 1
    if (this.health === 0) {
      this.kill()
    }
  }
}

export default SmallKnight
