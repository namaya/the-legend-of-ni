
/**
 * The main title screen.
 */
class loseGame extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
        this.bg = this.game.add.image(0, 0, 'bg');
        this.bg.scale.setTo(0.87, 1.2);
        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30, 'alagard', 'You were captured!', 50);
        title.anchor.setTo(0.5);

        let subtitle = this.game.add.bitmapText(CANVAS_WIDTH/2, 350, 'alagard', 'Press any button\n   to restart.', 30);
        subtitle.anchor.setTo(0.5);


    }


    update(){
        this.game.input.keyboard.onDownCallback = () => {
            this.game.input.keyboard.onDownCallback = null;
            this.game.state.start("throneRoom");
        }
    }

}
