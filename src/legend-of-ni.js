

/**
 * All of the states in the game.
 * To add a new state to the game, append it to this javascript object.
 */
let _states = {
    'title': new Title(this.game),
    'throneRoom': new ThroneRoom(this.game)
};

/**
 * The main API to our game.
 */
class LegendOfNi {

    constructor(width, height) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO);
        this._add_states();
    }

    /**
     * Adds all of the states inside of _states to the game.
     */
    _add_states() {
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

/**
 * The main() of our program
 */
let legendOfNi = new LegendOfNi(500, 500);
legendOfNi.play()