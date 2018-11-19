class SwitchButton extends Phaser.Sprite {
  constructor (game, x, y, texture, frame) {
    super(game, x, y, texture, frame)

    this.scale.setTo(0.5)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    this.animations.add('open', [0])
    this.animations.add('pressed', [1])

    this.body.allowGravity = false
    this.pressed = false
  }

  // create () {
  //   // this = this.game.add.sprite(930, 680, 'switch');
  //   this.scale.setTo(0.5)
  //   this.game.physics.enable(this, Phaser.Physics.ARCADE)

  //   this.animations.add('open', [0])
  //   this.animations.add('pressed', [1])

  //   this.body.collideWorldBounds = true
  //   this.allowGravity = false
  //   this.pressed = false
  // }

  update () {
    if (!this.pressed) {
      this.frame = 0
    } else {
      this.frame = 1
    }
  }

  press (action) {
    if (!this.pressed) {
      this.pressed = true
      action()
    }
  }
}

export default SwitchButton
