
// import PhaserObject from '../base/PhaserObject.js'

class BaseEnemy extends Phaser.Sprite {
  // constructor (game, x, y, texture, frame) {
  //   super(game, x, y, texture, frame)
  // }

  _redrawHealthBar () {
    this.healthBar.beginFill(0xffffff)
    this.healthBar.drawRect(0, 0, this.healthBarSettings.width, this.healthBarSettings.height)

    this.healthBar.beginFill(0xff0000)
    this.healthBar.drawRect(0, 0,
      (this.health / this.maxHealth) * this.healthBarSettings.width, this.healthBarSettings.height)
  }
}

export default BaseEnemy
