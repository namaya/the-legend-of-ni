
import { global } from '../../legend-of-ni.js'
import stats from '../../../conf/states/entrance.conf.js'

import BaseLevel from './base.js'

class Entrance extends BaseLevel {
  constructor (game) {
    super(game, stats)

    this.spring = global.sprites.spring
    this.gate = global.sprites.gate
    this.switchButton = global.sprites.switchButton
  }

  create () {
    this.game.world.setBounds(0, 0,
      global.canvas.width * this.conf.world.bounds.x - 100,
      global.canvas.height * this.conf.world.bounds.y)

    super.create()

    this.gate.create()
    this.switchButton.create()

    this.xavier.spawnArrows()

    this.gateClosed = true
  }

  update () {
    super.update()

    this.game.physics.arcade.collide(this.xavier.arrow1, this.floor)
    this.game.physics.arcade.collide(this.gate.sprite, this.floor)
    this.game.physics.arcade.collide(this.switchButton.sprite, this.floor)

    this.gate.update()
    this.switchButton.update()
    this.userInterface.update()

    if (this.gateClosed) {
      this.game.physics.arcade.collide(this.gate.sprite, this.xavier.sprite)
    }

    this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this)
    this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.switchButton.sprite, hitButton, null, this)
    this.game.physics.arcade.overlap(this.xavier.sprite, this.door, this.door.open('throneRoom'))
  }
}

function xavierDown(){
  this.xavier.arrow1.kill();
  this.game.state.start("loseGame");
}

function hitButton(){
  this.switchButton.pressed();
  this.gate.opened();
  this.gateClosed = false;
}


function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}

export default Entrance
