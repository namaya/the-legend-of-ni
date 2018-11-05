
// import PhaserObject from '../base/PhaserObject.js'

class BaseEnemy extends Phaser.Sprite {
  constructor (game, stats) {
    super(game)
    this.stats = stats
  }

  preload () {
    this.game.load.spritesheet(this.stats.spritesheet.key, this.stats.spritesheet.path)
  }

  create (group) {
    // Render to the screen
    this.sprite = this.game.add.sprite(this.stats.sprite.origin.x,
      this.stats.sprite.origin.y,
      this.stats.spritesheet.key,
      0,
      group)

    // Add sprite to the physics engine
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    this.sprite.body.collideWorldBounds = true

    this.sprite.animations.add('walk-left', [5, 6, 7, 8])

    // Initial Game State
    this.health = this.stats.health
  }
}

export default BaseEnemy
