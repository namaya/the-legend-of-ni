
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/tutorial.conf.js'

import BaseLevel from './base.js'

/**
 * Level 0: The Tutorial.
 */
class TutorialRoom extends BaseLevel {
  constructor (game) {
    super(game, stats)
  }

  create () {
    this.game.world.setBounds(0, 0,
      global.canvas.width * this.conf.world.bounds.x,
      global.canvas.height * this.conf.world.bounds.y)

    super.create()

    this.xavier.create(5, 40)

    this.game.camera.follow(this.xavier.sprite)

    let text1 = this.game.add.bitmapText(global.canvas.width / 2, 200, 'alagard', 'Press A/D to move.', 30)
    text1.anchor.setTo(0.5)

    let text2 = this.game.add.bitmapText(1000, 200, 'alagard', 'Press W to jump.', 30)
    text2.anchor.setTo(0.5)

    let text3 = this.game.add.bitmapText(2000, 200, 'alagard', '          Press K to shoot.\n\n Hold SPACEBAR to adjust power.', 30)
    text3.anchor.setTo(0.5)

    let text4 = this.game.add.bitmapText(2900, 200, 'alagard', 'Avoid enemies or shoot them.', 30)
    text4.anchor.setTo(0.5)

    this.game.add.bitmapText(3500, 200, 'alagard', 'Good luck.')

    let text6 = this.game.add.bitmapText(global.canvas.width / 2, 250, 'alagard', 'Press Enter to skip tutorial.', 30)
    text6.anchor.setTo(0.5)

    global.keyboard.ENTER.onDown.add(() => {
      this.game.state.start('level1')
      global.keyboard.ENTER.onDown.removeAll()
    })
  }

  update () {
    super.update()

    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => this.game.state.start('level1'))
  }
}

export default TutorialRoom
