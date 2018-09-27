
let _states = {
    'title': new Title(this.game),
    'throneRoom': new ThroneRoom(this.game)
};

class LegendOfNi {
    constructor(width, height) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO);
        this._add_states();
    }

    _add_states() {
        for (var key in _states) {
            if (_states.hasOwnProperty(key)) {
                this.game.state.add(key, _states[key].asObject());
            }
        }
    }

    play() {
        this.game.state.start('title');
    }
}

let legendOfNi = new LegendOfNi(500, 500);
legendOfNi.play()