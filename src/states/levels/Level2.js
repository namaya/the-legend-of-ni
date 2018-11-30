
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/level2.conf.js'
import BaseLevel from './base.js'

class Level2 extends BaseLevel {
  constructor (game) {
    super(game, stats)
  }

  create () {
    super.create()

    this.rocks = this.game.add.physicsGroup()

    this.game.time.events.repeat(Phaser.Timer.SECOND, 100, () => {
      for (var i = 0; i < this.conf.world.rockSpawns.length; i++) {
        var rock = this.rocks.create(this.conf.world.rockSpawns[i].x, this.conf.world.rockSpawns[i].y, 'rock')
        rock.body.allowGravity = true
      }
    }, this)

    this.door.locked = true
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

    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, () => this.door.open('BossTitle'))

    this.game.physics.arcade.overlap(this.xavier.sprite, this.treasure, () => {
      if (global.keyboard.ENTER.isDown && !this.treasure.opened) {
        this.treasure.open(() => {
          this.door.unlock()
          this.userInterface.addKey()
        })
      }
    })
  }
}

export default Level2
