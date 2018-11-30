
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
    super.create(() => {
      let text1 = this.game.add.bitmapText(global.canvas.width / 2, 200, 'alagard', 'Press A/D to move.', 30)
      text1.anchor.setTo(0.5)

      let text2 = this.game.add.bitmapText(1000, 200, 'alagard', 'Press W to jump.', 30)
      text2.anchor.setTo(0.5)

      this.game.add.bitmapText(1300, 200, 'alagard', 'Avoid falling rocks.', 30)

      let text3 = this.game.add.bitmapText(2000, 200, 'alagard', '          Press K to shoot.\n\n Hold SPACEBAR to adjust power.', 30)
      text3.anchor.setTo(0.5)

      let text4 = this.game.add.bitmapText(2900, 200, 'alagard', 'Avoid enemies or shoot them.', 30)
      text4.anchor.setTo(0.5)

      this.game.add.bitmapText(3300, 200, 'alagard', 'Good luck.', 30)

      this.game.add.bitmapText(3600, 180, 'alagard', 'Press ENTER to walk through.', 30)

      let text6 = this.game.add.bitmapText(global.canvas.width / 2, 250, 'alagard', 'Press ENTER to skip tutorial.', 30)
      text6.anchor.setTo(0.5)
    })

    this.rocks = this.game.add.physicsGroup()
    this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, addFallingRocks, this)  

    global.keyboard.ENTER.onDown.add(() => {
      this.game.state.start('EntranceTitle')
      global.keyboard.ENTER.onDown.removeAll()
    })
  }

  update () {
    super.update()

    this.game.physics.arcade.overlap(this.xavier.sprite, this.rocks, () => this.xavier.damage(), null, this)
    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => this.door.open('EntranceTitle'))
  }
}

function addFallingRocks () {
  var rock = this.rocks.create(Math.random() * 200 + 1300, 0, 'rock')
  rock.body.gravity.y = 100
}

export default TutorialRoom
