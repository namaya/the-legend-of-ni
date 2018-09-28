
/**
 * The main title screen.
 */
class Title extends BaseState {

    preload() {
        _global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        _global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        _global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        _global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
    }

    create() {
        this.game.state.start('throneRoom');
    }
}