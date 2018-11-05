import { global } from "../legend-of-ni.js";

class SmallRanger extends Phaser.Sprite {
  constructor (game, x, y, texture, frame, xavier) {
    super(game, x, y, texture, frame)

    game.physics.enable(this)
    this.scale.setTo(0.8)

    this.animations.add('walk-left', [2, 3])
    this.animations.add('walk-right', [0, 1])

    this.weapon = this.game.add.weapon(20, 'arrow')
    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS
    this.weapon.bulletRotateToVelocity = true
    this.weapon.bulletGravity = 1400
    this.weapon.bulletSpeed = 500
    this.weapon.trackSprite(this)
    this.weapon.trackOffset.setTo(32, 32)

    this.weapon.onFire.add(arrow => arrow.scale.setTo(0.35))

    // Initial Game State
    this.animations.play('walk-right', 6, true)
    this.isFacingRight = true
    this.health = 3

    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, () => {
      if (this.inCamera && this.alive) {
        this.weapon.fire(null, global.sprites.xavier.sprite.x, global.sprites.xavier.sprite.y)
      }
    })
  }

  update () {
    this.game.physics.arcade.overlap(this.weapon.bullets, global.sprites.xavier.sprite, (xavier, arrow) => {
      arrow.kill()
      global.sprites.xavier.damage()
    })
  }

  damage () {
    this.health -= 1
    if (this.health === 0) {
      this.weapon.killAll()
      this.kill()
    }
  }
}

export default SmallRanger
