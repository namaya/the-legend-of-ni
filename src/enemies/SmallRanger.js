import { global } from '../legend-of-ni.js'
import BaseEnemy from './BaseEnemy.js'

class SmallRanger extends BaseEnemy {
  constructor (game, x, y, texture, frame) {
    super(game, x, y, texture, frame, 1)

    this.xavier = global.sprites.xavier

    this.anchor.setTo(0.5)

    // this.game.physics.enable(this)
    this.healthBar = this._createHealthBar()

    this.maxHealth = 3
    this.health = this.maxHealth

    this.animations.add('walk-left', [2, 3])
    this.animations.add('walk-right', [0, 1])

    this.weapon = this.game.add.weapon(20, 'arrow')
    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS
    this.weapon.bulletRotateToVelocity = true
    this.weapon.bulletGravity = 1400
    this.weapon.bulletSpeed = 500
    this.weapon.trackSprite(this)
    // this.weapon.trackOffset.setTo(32, 32)

    this.weapon.onFire.add(arrow => arrow.scale.setTo(0.35))

    // Initial Game State
    this.animations.play('walk-right', 6, true)
    this.isFacingRight = true
    this.prevDirection = true
    // this.health = 3

    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, () => {
      if (this.inCamera && this.alive && !global.paused) {
        this.weapon.fire(null, global.sprites.xavier.sprite.x, global.sprites.xavier.sprite.y)
      }
    })
  }

  _createHealthBar () {
    this.healthBarSettings = {
      'x': this.x - 27,
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
    if (this.prevDirection && this.x > this.xavier.sprite.x) {
      this.prevDirection = false
      this.scale.setTo(-1, 1)
    } else if (!this.prevDirection && this.x < this.xavier.sprite.x) {
      this.prevDirection = true
      this.scale.setTo(1, 1)
    }

    this.game.physics.arcade.overlap(this.weapon.bullets, global.sprites.xavier.sprite, (xavier, arrow) => {
      arrow.kill()
      this.xavier.damage()
    })
  }

  damage () {
    this.health -= 1
    this._redrawHealthBar()
    if (this.health === 0) {
      this.weapon.killAll()
      this.healthBar.kill()
      this.kill()
    }
  }
}

export default SmallRanger
