
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/level1.conf.js'
import BaseLevel from './base.js'

class Level1 extends BaseLevel {
  constructor (game) {
    super(game, stats)
  }

  create () {
    this.game.world.setBounds(0, 0,
      global.canvas.width * this.conf.world.bounds.x,
      global.canvas.height * this.conf.world.bounds.y)

    super.create()
  }

  update () {
    super.update()

    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => this.door.open('level2'))

    this.game.physics.arcade.overlap(this.xavier.sprite, this.treasure, () => {
      if (global.keyboard.ENTER.isDown && !this.treasure.opened) {
        this.treasure.open(() => this.xavier.replenishAmmo())
      }
    })
  }
}

export default Level1
