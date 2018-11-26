
import { global } from './legend-of-ni.js'

class Door extends Phaser.Sprite {
  constructor (game, x, y, texture, lock) {
    super(game, x, y, texture, 0)

    this.game.physics.enable(this)
    this.body.allowGravity = false

    this.game.onLock = new Phaser.Signal()
    this.game.onLock.add(() => setTimeout(() => {
      this.text.destroy()
      this.graphics.destroy()
      this.dispatched = false
    }, 2000))

    this.dispatched = false
    this.locked = lock || false
  }

  open (nextState) {
    if (global.keyboard.ENTER.isDown) {
      if (this.locked) {
        if (!this.dispatched) {
          this.graphics = this.game.add.graphics(global.canvas.width / 2 - 100, global.canvas.height - 125)
          this.graphics.anchor.setTo(0.5)
          this.graphics.beginFill(0xffffff)
          this.graphics.fixedToCamera = true
          this.graphics.drawRoundedRect(0, 0, 200, 50, 10)

          this.text = this.game.add.bitmapText(global.canvas.width / 2, global.canvas.height - 100, 'alagard', 'It\'s locked!', 30)
          this.text.anchor.setTo(0.5)
          this.text.fixedToCamera = true
          this.dispatched = true
          this.game.onLock.dispatch()
        }
      } else {
        this.game.state.start(nextState)
      }
    }
  }

  unlock () {
    this.locked = false
  }
}

export default Door
