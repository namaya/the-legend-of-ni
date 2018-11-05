
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/test.conf.js'
import BaseLevel from './base.js'

/**
 * Level Inf: Test Level.
 */
class Test extends BaseLevel {
  constructor (game) {
    super(game, stats)
  }

  create () {
    this.game.world.setBounds(0, 0,
      global.canvas.width * this.conf.world.bounds.x,
      global.canvas.height * this.conf.world.bounds.y)

    super.create()

    this.userInterface.create()
    this.xavier.create(5, 5)

    this.game.camera.follow(this.xavier.sprite)
  }

  update () {
    super.update()

    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => {
      if (global.keyboard.ENTER.isDown) {
        this.game.state.start('entrance')
      }
    })
  }
}

export default Test
