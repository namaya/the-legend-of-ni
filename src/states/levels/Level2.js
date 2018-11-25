
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/level2.conf.js'
import BaseLevel from './base.js'

class Level2 extends BaseLevel {
  constructor (game) {
    super(game, stats)
  }

  create () {
    this.game.world.setBounds(0, 0,
      global.canvas.width * this.conf.world.bounds.x,
      global.canvas.height * this.conf.world.bounds.y)

    super.create()

    this.rocks = this.game.add.physicsGroup()

    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, () => {
      for (var i = 0; i < this.conf.world.rockSpawns.length; i++) {
        var rock = this.rocks.create(this.conf.world.rockSpawns[i].x, this.conf.world.rockSpawns[i].y, 'rock')
        rock.body.allowGravity = false
        rock.body.velocity.y = 250
      }
    }, this)

    this.hasKey = false
  }

  update () {
    super.update()

    if (this.bridge.dropped) {
      this.game.physics.arcade.collide(this.bridge, this.spikes)
      this.game.physics.arcade.collide(this.xavier.sprite, this.bridge)
    }

    this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.switches, (arrow, switch_) => {
      arrow.kill()
      switch_.press(() => this.bridge.drop())
    })

    this.game.physics.arcade.collide(this.rocks, this.floor, rock => rock.kill())
    this.game.physics.arcade.overlap(this.xavier.sprite, this.rocks, () => this.xavier.damage())

    if (this.hasKey) {
      this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => this.door.open('throneRoom'))
    }

    this.game.physics.arcade.overlap(this.xavier.sprite, this.treasure, () => {
      if (global.keyboard.ENTER.isDown && !this.treasure.opened) {
        this.treasure.open(() => {
          this.hasKey = true
          this.userInterface.addKey()
        })
      }
    })
  }
}

export default Level2
