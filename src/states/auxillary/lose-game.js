
import { global } from '../../legend-of-ni.js'

import BaseState from '../base.js'

/**
 * The main title screen.
 */
class LoseGame extends BaseState {
  create () {
    let title = this.game.add.bitmapText(global.canvas.width / 2, global.canvas.height / 2, 'alagard', 'You were captured!', 50)
    title.anchor.setTo(0.5)

    let subtitle = this.game.add.bitmapText(global.canvas.width / 2, 350, 'alagard', 'Press ENTER\n  to restart.', 30)
    subtitle.anchor.setTo(0.5)

    global.keyboard.ENTER.onDown.add(() => this.game.state.start('level1'))
  }
}

export default LoseGame
