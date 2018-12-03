
import { global } from '../../legend-of-ni.js'
import BaseState from '../base.js'

/**
 * The main title screen.
 */
export default class WinGame extends BaseState {
  create () {
    let image = this.game.add.sprite(0, 0, 'transitionBg')
    image.scale.setTo(1.15, 1)

    let title = this.game.add.bitmapText(global.canvas.width / 2, global.canvas.height / 2, 'alagard', 'You won!', 50)
    title.anchor.setTo(0.5)

    // this.boss_music = this.game.add.audio('bossmusic')
    // this.boss_music.play()
  }
}
