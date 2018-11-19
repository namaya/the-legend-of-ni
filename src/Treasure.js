class Treasure extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y, texture, 0)

    this.scale.setTo(0.15)
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.opened = false
  }

  open (action) {
    if (!this.opened) {
      console.log('test')
      this.opened = true
      action()
    }
  }
}

export default Treasure
