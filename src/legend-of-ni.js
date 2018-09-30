

/**
 * The state of our game that is shared across multiple states.
 */
let _global = {
    'sprites': {},
    'keyboard': {}
}

/**
 * The main API to our game.
 */
class LegendOfNi {

    constructor(width, height) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO);

        _global.sprites.xavier = new Xavier(this.game);
        _global.sprites.megaknight = new MegaKnight(this.game);
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
        let _states = {
            'title': new Title(this.game),
            'throneRoom': new ThroneRoom(this.game)
        };

        for (var key in _states) {
            if (_states.hasOwnProperty(key)) {
                this.game.state.add(key, _states[key].asJson());
            }
        }
    }

    /**
     * Starts the game
     */
    play() {
        this.game.state.start('title');
    }
}

/*
 * The main() of our program.
 */
let CANVAS_WIDTH = 750;
let CANVAS_HEIGHT = 450;
let legendOfNi = new LegendOfNi(CANVAS_WIDTH, CANVAS_HEIGHT);
legendOfNi.play()
