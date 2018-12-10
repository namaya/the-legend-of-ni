
import { global } from './legend-of-ni.js'
import SmallKnight from './enemies/small-knight.js'

let knights_stats = {
  'walk_speed': 250,
  'x': 200, 
  'y': 532,
  'animation': { speed: 6, hack: 75 },
  'health': {x: 485, y: 25, width: 10, height: 50},
  'spritesheet': {x: 92, y: 68},
  'weapon': {adj: {x: 49, y: 25}},
  'hack': {'transforming': 20}
}

export default class MegaKnight {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.spritesheet('megaknight', 'assets/characters/megaknight-w-axe.png',
      knights_stats.spritesheet.x, knights_stats.spritesheet.y)
  }

  create () {
    this.health = 10
    this.isFacingRight = true
    knights_stats.walk_speed = 250

    this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight')
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.animations.add('walk-right', [0, 1, 2, 3])
    this.sprite.animations.add('walk-left', [4, 5, 6, 7])
    this.sprite.animations.add('angry-walk-right', [16, 17, 16, 17])
    this.sprite.animations.add('angry-walk-left', [18, 19, 18, 19])
    this.sprite.animations.add('transform', [8, 9, 8, 9, 10, 9, 10])
    this.sprite.animations.add('spawn', [12, 13, 12, 13])
    this.sprite.body.collideWorldBounds = true
    this.ouch = this.game.add.audio('ouch')

    this.angry = false
    this.transforming = false
    this.spawning = false
    this.walkAnimation = { 'right': 'walk-right', 'left': 'walk-left' }

    this.sprite.animations.play(this.walkAnimation.left, knights_stats.animation.speed, true)
    this.sprite.body.velocity.x = -knights_stats.walk_speed

    this.enemies = this.game.add.physicsGroup()

    let group = this.game.add.group()
    let healthbarGraphics = this.game.add.graphics()
    healthbarGraphics.fixedToCamera = true
    // healthbarGraphics.cameraOffset.setTo(20, 60)

    healthbarGraphics.beginFill(0xFFFF33, 1)
    healthbarGraphics.drawRect(240, 65, (global.canvas.width - 300) * this.health / 10, 20)
    healthbarGraphics.endFill()
    group.add(healthbarGraphics)
  }

  update () {
    if (!global.paused) {
      if (this.transforming) {
        if (this.sprite.animations.currentAnim.isFinished) {
          this.transforming = false

          if (!this.isFacingRight) {
            this.sprite.scale.setTo(1)
            // this.sprite.x -= knights_stats.hack.transforming
          }

          this.walkAnimation = { 'right': 'angry-walk-right', 'left': 'angry-walk-left' }

          if (this.isFacingRight) {
            this.sprite.animations.play(this.walkAnimation.right, knights_stats.animation.speed, true)
            this.sprite.body.velocity.x = knights_stats.walk_speed
          } else {
            this.sprite.animations.play(this.walkAnimation.left, knights_stats.animation.speed, true)
            this.sprite.body.velocity.x = -knights_stats.walk_speed
          }
        }
      } else if (this.spawning) {
        if (this.sprite.animations.currentAnim.isFinished) {
          this.spawning = false

          if (!this.isFacingRight) {
            this.sprite.scale.setTo(1)
          }

          for (var i = 0; i < 2; i++) {
            this.enemies.add(new SmallKnight(this.game, Math.random() * this.conf.world.bounds.x, 200, 'knight', 0, true))
          }

          // this.isFacingRight = true
          if (this.isFacingRight) {
            this.sprite.animations.play(this.walkAnimation.right, knights_stats.animation.speed, true)
            this.sprite.body.velocity.x = knights_stats.walk_speed
          } else {
            this.sprite.animations.play(this.walkAnimation.left, knights_stats.animation.speed, true)
            this.sprite.body.velocity.x = -knights_stats.walk_speed
          }
        }
      } else {
        this._walk()
      }
    }
  }

  _walk () {
    if (this.sprite.body.onWall() && this.isFacingRight) {
      // if the boss hits the right boundary, switch direction
      this.sprite.animations.play(this.walkAnimation.left, knights_stats.animation.speed, true)
      this.sprite.body.velocity.x = -knights_stats.walk_speed
      this.isFacingRight = false
    } else if (this.sprite.body.onWall() && !this.isFacingRight) {
      // if the boss hits the left boundary, switch direction
      this.sprite.animations.play(this.walkAnimation.right, knights_stats.animation.speed, true)
      this.sprite.body.velocity.x = knights_stats.walk_speed
      this.isFacingRight = true
    }
  }

  damage () {
    if (!this.transforming) {
      this.health -= 1
      this.ouch.play()

      let group = this.game.add.group()
      let healthbarGraphics = this.game.add.graphics()
      let healthbarGraphicsB = this.game.add.graphics()
      healthbarGraphicsB.fixedToCamera = true
      healthbarGraphics.fixedToCamera = true

      healthbarGraphics.beginFill(0xFFFF33, 1)
      healthbarGraphics.drawRect(240, 65, (global.canvas.width - 300) * this.health / 10, 20)

      healthbarGraphicsB.beginFill(0xFF700B, 1)
      healthbarGraphicsB.drawRect(240, 65, (global.canvas.width - 300), 20)
      healthbarGraphicsB.endFill()

      group.add(healthbarGraphicsB)
      group.add(healthbarGraphics)

      if (!this.angry && this.health < 5) {
        this.angry = true
        this.transforming = true

        if (!this.isFacingRight) {
          this.sprite.scale.setTo(-1, 1)
          // this.sprite.x += knights_stats.hack.transforming
        }

        this.sprite.animations.play('transform', 5, false)

        knights_stats.walk_speed += 100
        this.sprite.body.velocity.x = 0
      }

    }
  }

  spawnEnemies () {
    if (!this.transforming) {
      this.spawning = true
      if (!this.isFacingRight) {
        this.sprite.scale.setTo(-1, 1)
      }

      this.sprite.animations.play('spawn', 4, false)
      // this.sprite.x += 5
      this.sprite.body.velocity.x = 0
    }
  }

  reset () {

  }

  isDead () {
    return this.health <= 0
  }

}
