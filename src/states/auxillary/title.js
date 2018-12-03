
import { global } from '../../legend-of-ni.js'

import BaseState from '../base.js'

/**
 * Introduction: The main title screen.
 */
export default class Title extends BaseState {
  preload () {
    this.game.load.image('titleScreen', '/assets/maps/title/title.png')
  }

  create () {
    let image = this.game.add.sprite(0, 0, 'titleScreen')
    image.scale.setTo(1.15, 1)

    // let graphics = this.game.add.graphics()
    // graphics.beginFill(0xf4ebca)
    // graphics.drawRect(85, 180 - 75 / 2, 420, 75)

    let title = this.game.add.bitmapText(global.canvas.width / 2, 90, 'alagard', 'The Legend of Ni', 50)
    title.anchor.setTo(0.5)

    // let subtitle = this.game.add.bitmapText(global.canvas.width / 2, 300, 'alagard', 'Press any button\n   to continue.', 30)
    // subtitle.anchor.setTo(0.5)

    this.boss_music = this.game.add.audio('bossmusic')
    this.boss_music.play('', 0, 1, true)

    this.game.input.keyboard.onDownCallback = () => {
      this.game.input.keyboard.onDownCallback = null
      this.game.state.start('tutorial')
    }
  }
}
