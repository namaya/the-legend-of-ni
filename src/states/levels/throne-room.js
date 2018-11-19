
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/throne.conf.js'

import BaseLevel from './base.js'

/**
 * The final boss map.
 */
class ThroneRoom extends BaseLevel {
  constructor (game) {
    super(game, stats)
    this.xavier = global.sprites.xavier
    this.megaknight = global.sprites.megaknight
    this.megaknight.conf = this.conf
  }

  create () {
    this.game.world.setBounds(0, 0, 1024, 640)

    super.create()

    this.ouch = this.game.add.audio('ouch')

    this.megaknight.create()

    this.xavier.spawnArrows()

    // this.rocks = this.game.add.physicsGroup()
    // this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, addFallingRocks, this)

    this.game.time.events.repeat(Phaser.Timer.SECOND * 8, 100, () => {
      this.game.camera.shake(0.03, 1000)
      this.megaknight.spawnEnemies()
    }, this)
  }

  update () {
    super.update()

    this.game.physics.arcade.collide(this.megaknight.sprite, this.floor)
    this.game.physics.arcade.collide(this.megaknight.enemies, this.floor)
    this.game.physics.arcade.collide(this.xavier.arrow1, this.floor)

    this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.megaknight.sprite, (mk, arrow) => {
      arrow.kill()
      this.megaknight.damage()
      this.ouch.play()
    })

    this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.megaknight.enemies, (arrow, enemy) => {
      arrow.kill()
      enemy.damage()
    })

    this.xavier.update()
    this.megaknight.update()

    if (this.megaknight.isDead()) {
      this.game.state.start('winGame')
    }

    this.game.physics.arcade.overlap(this.xavier.sprite, this.megaknight.sprite, this._xavierDown, null, this)
    this.game.physics.arcade.overlap(this.xavier.sprite, this.megaknight.enemies, this._xavierDown, null, this)
    this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this)
    this.game.physics.arcade.overlap(this.xavier.sprite, this.rocks, () => this.xavier.damage(), null, this)
    this.game.physics.arcade.overlap(this.xavier.sprite, this.enemies, () => this.xavier.damage(), null, this)

    this.enemies.forEachAlive(enemy => enemy.update())
  }

  _xavierDown (xavier, opponent) {
    this.xavier.damage()
  }
}

function addFallingRocks(){
    var rock = this.rocks.create(Math.random() * global.canvas.width, 0, 'rock');
    rock.body.gravity.y = 100;
}

function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}

export default ThroneRoom
