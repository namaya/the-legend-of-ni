
/**
 * The main title screen.
 */
class Title extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
    }

    create() {
        _global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        _global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        _global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        _global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K);

        this.game.stage.backgroundColor = 0xf4ebca;

        let title = this.game.add.bitmapText(250, 180, 'alagard', 'The Legend of Ni', 50);
        title.anchor.setTo(0.5);
        
        let subtitle = this.game.add.bitmapText(250, 300, 'alagard', 'Press any button\n   to continue.', 30);
        subtitle.anchor.setTo(0.5);

        this.game.input.keyboard.onDownCallback = () => {
            this.game.input.keyboard.onDownCallback = null;
            this.game.state.start("throneRoom");
        }
    }
}