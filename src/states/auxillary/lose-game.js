
import { global } from '../../legend-of-ni.js'

import BaseState from '../base.js'

/**
 * The main title screen.
 */
class LoseGame extends BaseState {
  constructor (game) {
    super(game)

    this.xavier = global.sprites.xavier
  }

  create () {
    let image = this.game.add.sprite(0, 0, 'transitionBg')
    image.scale.setTo(1.15, 1)

    let title = this.game.add.bitmapText(global.canvas.width / 2, 180, 'alagard', 'You died!', 50)
    title.anchor.setTo(0.5)

    let subtitle = this.game.add.bitmapText(global.canvas.width / 2, 300, 'alagard', 'Press ENTER\n  to restart.', 30)
    subtitle.anchor.setTo(0.5)

    global.keyboard.ENTER.onDown.add(() => {
      this.xavier.reset()
      this.game.state.start('entrance')
    })
  }
}

export default LoseGame
