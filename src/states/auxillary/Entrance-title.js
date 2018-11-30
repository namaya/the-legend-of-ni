
import { global } from '../../legend-of-ni.js'

import BaseState from '../base.js'

/**
 * Introduction: The main title screen.
 */
export default class Title extends BaseState {
  create () {
    let graphics = this.game.add.graphics()
    graphics.beginFill(0xf4ebca)
    graphics.drawRect(0, 0, global.canvas.width, global.canvas.height)

    let title = this.game.add.bitmapText(global.canvas.width / 2, 180, 'alagard', 'Castle Entrance', 50)
    title.anchor.setTo(0.5)

    let subtitle = this.game.add.bitmapText(global.canvas.width / 2, 300, 'alagard', 'Press any button\n   to continue.', 30)
    subtitle.anchor.setTo(0.5)


    this.game.input.keyboard.onDownCallback = () => {
      this.game.input.keyboard.onDownCallback = null
      this.game.state.start('entrance')
    }
  }
}
