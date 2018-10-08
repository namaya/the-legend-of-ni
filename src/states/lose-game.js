
/**
 * The main title screen.
 */
class LoseGame extends BaseState {

    preload() {
        // this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        // this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {

        let map = this.game.add.tilemap('room', 64, 64);
        map.addTilesetImage('castle');
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(2, 2, true, this.platforms)

        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 'alagard', 'You were captured!', 50);
        title.anchor.setTo(0.5);

        let subtitle = this.game.add.bitmapText(CANVAS_WIDTH/2, 350, 'alagard', 'Press SPACEBAR\n     to restart.', 30);
        subtitle.anchor.setTo(0.5);

        _global.keyboard.SPACE.onDown.add(() => {
            this.game.state.start("throneRoom");
        });
    }


    update(){
    }

}
