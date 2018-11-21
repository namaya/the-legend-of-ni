
class SmallKnight extends Phaser.Sprite {
  constructor (game, x, y, texture, frame, movable) {
    super(game, x, y, texture, frame)

    game.physics.enable(this)

    this.scale.setTo(0.5)
    this.body.collideWorldBounds = true

    this.animations.add('walk-left', [5, 6, 7, 8])
    this.animations.add('walk-right', [0, 1, 2, 3])

    // Initial Game State
    if (movable) {
      if (Math.random() > 0.5) {
        this.animations.play('walk-left', 6, true)
        this.body.velocity.x = -100
        this.isFacingRight = false
      } else {
        this.animations.play('walk-right', 6, true)
        this.body.velocity.x = 100
        this.isFacingRight = true
      }
    } else {
      this.animations.play('walk-left', 6, true)
    }

    this.health = 3
  }

  update () {
    if (this.body.onWall() && this.isFacingRight) {
      // if the boss hits the right boundary, switch direction
      this.animations.play('walk-left', 6, true)
      this.body.velocity.x = -100
      this.isFacingRight = false
    } else if (this.body.onWall() && !this.isFacingRight) {
      // if the boss hits the left boundary, switch direction
      this.animations.play('walk-right', 6, true)
      this.body.velocity.x = 100
      this.isFacingRight = true
    }
  }

  damage () {
    this.health -= 1
    if (this.health === 0) {
      this.kill()
    }
  }
}

export default SmallKnight
