
class LegendOfNi {
    constructor(width, height) {
        this.game = new Phaser.Game(width, height, Phaser.AUTO);
        this.game.state.add('title', title)
    }

    play() {
        this.game.state.start('title')
    }
}

(new LegendOfNi(500, 500)).play()