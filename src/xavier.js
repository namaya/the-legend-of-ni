
import { global } from './legend-of-ni.js'

let x_conf = {
    'walk_speed': 200,
    'jump_speed': 650,
    'bounce_speed': 1200,
    'origin': {x: 10, y: 5},
    'arrow_speed': {x: 400, y: 100},
    'max_power': 60,
    'animation': {speed: 12, hack: 75},
    'spritesheet': {x: 64, y: 64}
};

class Xavier {
  constructor (game) {
    this.game = game
    this.numLives = 3
    this.power = 0
    this.isFacingRight = true

    this.game.onShoot = new Phaser.Signal()
    this.game.onPlayerDamaged = new Phaser.Signal()
    this.game.onPowerDelta = new Phaser.Signal()
  }

  preload () {
    this.game.load.spritesheet('xavier', 'assets/characters/xavier.png', 72, 92)
    this.game.load.image('arrow', 'assets/items/arrow.png')
    this.game.load.image('quiver', 'assets/items/quiver.png')
    this.game.load.audio('swoosh', 'assets/sounds/arrowSwoosh.mp3')
    this.game.load.audio('jump', 'assets/sounds/jump.mp3')
  }

  create (x, y) {
    global.keyboard.W.onDown.add(this._jump, this)
    global.keyboard.K.onDown.add(this._shoot, this)

    this.sprite = this.game.add.sprite(x, y, 'xavier')
    this.sprite.scale.setTo(0.75)
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.collideWorldBounds = true
    this.sprite.body.deltaMax.setTo(1000, 15)
    this.sprite.animations.add('walk-right', [0, 1])
    this.sprite.animations.add('walk-left', [2, 3])
    this.sprite.animations.add('climb', [4, 5, 6, 7, 8, 9])
    this.swoosh = this.game.add.audio('swoosh')
    this.jump = this.game.add.audio('jump')
    this.ouch = this.game.add.audio('ouch')

    this.weapon = this.game.add.weapon(20, 'arrow')
    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS
    this.weapon.bulletRotateToVelocity = true
    this.weapon.bulletGravity = 1400
    this.weapon.trackSprite(this.sprite)
    this.weapon.trackOffset.setTo(32, 32)

    this.weapon.onFire.add(arrow => arrow.scale.setTo(0.35))

    this.ammo = 20
    this.power = 0
    this.numLives = 3
    this.isFacingRight = true
    this.isClimbing = false
    this.damaged = false
    this.powerDepleted = true

    this.game.onShoot.dispatch(this.ammo)
    this.game.onPlayerDamaged.dispatch(this.numLives)
    this.game.onPowerDelta.dispatch(this.power)

    this.game.onPlayerDamaged.add(() => setTimeout(() => {
      this.damaged = false
      this.sprite.tint = 0xffffff
    }, 1000))
  }

  update () {
    if (!this.isClimbing) {
      this.sprite.body.allowGravity = true
      if (global.keyboard.D.isDown) {
        this._walkRight()
      } else if (global.keyboard.A.isDown) {
        this._walkLeft()
      } else {
        this._stand()
      }

      if (global.keyboard.SPACE.isDown) {
        if (this.power < x_conf.max_power) {
          this.powerDepleted = true
          this.power += 1
          if (this.power % 5 === 0) {
            this.game.onPowerDelta.dispatch(this.power)
          }
        }
      } else {
        this.power = 0
        if (this.powerDepleted) {
          this.game.onPowerDelta.dispatch(this.power)
          this.powerDepleted = false
        }
      }
    } else {
      this.sprite.body.allowGravity = false
      if (global.keyboard.D.isDown) {
        this._walkRight()
      } else if (global.keyboard.A.isDown) {
        this._walkLeft()
      } if (global.keyboard.W.isDown) {
        this._climbUp()
      } else if (global.keyboard.S.isDown) {
        this._climbDown()
      } else {
        this._holdOn()
      }

      if (global.keyboard.SPACE.isDown) {
        if (this.power < x_conf.max_power) {
          this.powerDepleted = true
          this.power += 1
          if (this.power % 5 === 0) {
            this.game.onPowerDelta.dispatch(this.power)
          }
        }
      } else {
        this.power = 0
        if (this.powerDepleted) {
          this.game.onPowerDelta.dispatch(this.power)
          this.powerDepleted = false
        }
      }
    }

    this.isClimbing = false
  }

  _climbUp () {
    this.sprite.animations.play('climb', x_conf.animation.speed, true)
    this.sprite.body.velocity.setTo(0, -100)
  }

  _climbDown () {
    this.sprite.animations.play('climb', x_conf.animation.speed, true)
    this.sprite.body.velocity.setTo(0, 100)
  }

  _holdOn () {
    this.sprite.animations.stop()
    this.sprite.body.velocity.setTo(0)
  }

  damage () {
    if (!this.damaged) {
      this.damaged = true
      this.numLives -= 1
      this.ouch.play()
      console.log(this.sprite.tint)
      this.sprite.tint = 0xff7f7f
      console.log(this.sprite.tint)
      if (this.numLives === 0) {
        this.kill()
      } else {
        this.game.onPlayerDamaged.dispatch(this.numLives)
      }
    }
  }

  kill () {
    this.game.state.start('loseGame')
  }

  climb () {
    this.isClimbing = true
  }

  _walkRight () {
    this.sprite.animations.play('walk-right', x_conf.animation.speed, true)
    this.sprite.body.velocity.x = x_conf.walk_speed
    this.isFacingRight = true
  }

  _walkLeft () {
    this.sprite.animations.play('walk-left', x_conf.animation.speed, true)
    this.sprite.body.velocity.x = -x_conf.walk_speed
    this.isFacingRight = false
  }

  _stand () {
    this.sprite.animations.stop()
    this.sprite.body.velocity.x = 0
    this.sprite.animations.frame = this.isFacingRight ? 0 : 2
  }

  _jump () {
    if (this.sprite.body.onFloor()) {
      this.sprite.body.velocity.y = -x_conf.jump_speed
      this.jump.play()
    }
  }

  _shoot () {
    if (this.ammo > 0) {
      this.weapon.bulletSpeed = 500 + 5 * this.power

      if (this.isFacingRight) {
        this.weapon.fire(null, this.sprite.x + 100, this.sprite.y - 2 * this.power)
      } else {
        this.weapon.fire(null, this.sprite.x - 100, this.sprite.y - 2 * this.power)
      }

      this.swoosh.play()
      this.ammo -= 1
      this.power = 0
      this.game.onShoot.dispatch(this.ammo)
    }
  }

  addArrows () {
    this.arrow1.kill()
    this.ammo += 1
    this.game.onShoot.dispatch(this.ammo)
  }

  bounceSpring () {
    this.sprite.body.velocity.y = -x_conf.bounce_speed
    this.jump.play()
  }

  spawnArrows () {
    this.arrow1 = this.game.add.sprite(Math.floor(Math.random() * global.canvas.width), 100, 'quiver', 0)
    this.game.physics.enable(this.arrow1)
    this.arrow1.scale.setTo(0.5, 0.5)
    this.arrow1.enableBody = true
    this.arrow1.body.collideWorldBounds = true
  }
}

export default Xavier
