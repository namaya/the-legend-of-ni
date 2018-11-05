
import settings from '../conf/legend-of-ni.conf.js'
import states from './states/index.js'

import Xavier from './xavier.js'
import MegaKnight from './megaknight.js'
import UserInterface from './user-interface.js'
import Spring from './spring.js'
import Gate from './gate.js'
import SwitchButton from './switchbutton.js'

/**
 * The state of our game that is shared across multiple states.
 */
export let global = {
  'canvas': {
    'width': settings.canvas.scale * settings.canvas.tile.x * settings.canvas.x,
    'height': settings.canvas.scale * settings.canvas.tile.y * settings.canvas.y
  },
  'states': { 'all': {}, 'levels': {}, 'keys': {} },
  'sprites': {},
  'keyboard': {},
  'misc': {}
}

/**
 * The main API to our game.
 */
class LegendOfNi {
  constructor (width, height) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO)

    global.misc.userInterface = new UserInterface(this.game)
    global.sprites.xavier = new Xavier(this.game)
    global.sprites.megaknight = new MegaKnight(this.game)
    // global.sprites.spring = new Spring(this.game)
    global.sprites.gate = new Gate(this.game)
    global.sprites.switchButton = new SwitchButton(this.game)

    this._addStates()
  }

  /**
   * Create and add all states to the game.
   */
  _addStates () {
    for (var key in states) {
      if (states.hasOwnProperty(key)) {
        let state = new states[key].State(this.game)
        global.states.all[key] = state

        if (states[key].isLevel) {
          global.states.levels[key] = state
        }

        this.game.state.add(key, global.states.all[key].asJson())
      }
    }
  }

  /**
   * Starts the game.
   */
  play () {
    this.game.state.start('preload')
  }
}

/*
 * The main() of our program.
 */
let legendOfNi = new LegendOfNi(global.canvas.width, global.canvas.height)
legendOfNi.play()
