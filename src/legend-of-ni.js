
import settings from '../conf/legend-of-ni.conf.js';
import states from "./states/index.js";

import Xavier from './xavier.js';
import MegaKnight from './megaknight.js';
import UserInterface from './user-interface.js';
import Spring from "./spring.js";
import Gate from "./gate.js";
import SwitchButton from "./switchbutton.js";

/**
 * The state of our game that is shared across multiple states.
 */
export let global = {
    'canvas': {
        'width': settings.canvas.scale * settings.canvas.tile.x * settings.canvas.x,
        'height': settings.canvas.scale * settings.canvas.tile.y * settings.canvas.y
    },
    'states': {},
    'sprites': {},
    'keyboard': {},
    'misc': {}
}

/**
 * The main API to our game.
 */
class LegendOfNi {

    constructor(width, height) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO);

        global.misc.user_interface = new UserInterface(this.game);
        global.sprites.xavier = new Xavier(this.game);
        global.sprites.megaknight = new MegaKnight(this.game);
        global.sprites.spring = new Spring(this.game);
        global.sprites.gate = new Gate(this.game);
        global.sprites.switchButton = new SwitchButton(this.game);

        this._add_states();
    }

    /**
     * Adds all of the states inside of _states to the game.
     */
    _add_states() {
        /**
         * All of the states in the game.
         * To add a new state to the game, append it to this javascript object.
         */
        global.states = {
            'preload': new states.Preload(this.game),
            'title': new states.Title(this.game),
            'tutorial': new states.TutorialRoom(this.game),
            'entrance': new states.Entrance(this.game),
            'throneRoom': new states.ThroneRoom(this.game),
            'winGame': new states.WinGame(this.game),
            'loseGame': new states.LoseGame(this.game),
        };

        for (var key in global.states) {
            if (global.states.hasOwnProperty(key)) {
                this.game.state.add(key, global.states[key].asJson());
            }
        }
    }

    /**
     * Starts the game
     */
    play() {
        this.game.state.start('preload');
    }
}

/*
 * The main() of our program.
 */
let legendOfNi = new LegendOfNi(global.canvas.width, global.canvas.height);
legendOfNi.play()
