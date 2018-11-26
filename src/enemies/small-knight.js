import BaseEnemy from './BaseEnemy.js'

class SmallKnight extends BaseEnemy {
  constructor (game, x, y, texture, frame, movable) {
    super(game, x, y, texture, frame)

    this.game.physics.enable(this)
    this.body.collideWorldBounds = true

    this.scale.setTo(0.5)

    this.healthBar = this._createHealthBar()

    this.maxHealth = 3
    this.health = this.maxHealth

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
  }

  _createHealthBar () {
    this.healthBarSettings = {
      'x': this.x + 15,
      'y': this.y - this.height - 15,
      'width': 45,
      'height': 5
    }

    let healthBar = this.game.add.graphics(this.healthBarSettings.x, this.healthBarSettings.y)

    this.game.physics.enable(healthBar)
    healthBar.body.allowGravity = false

    healthBar.beginFill(0xff0000)

    healthBar.drawRect(0, 0, this.healthBarSettings.width, this.healthBarSettings.height)

    return healthBar
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

    this.healthBar.x = this.x
    this.healthBar.y = this.y
  }

  damage () {
    this.health -= 1
    this._redrawHealthBar()
    if (this.health === 0) {
      this.healthBar.kill()
      this.kill()
    }
  }
}

export default SmallKnight
