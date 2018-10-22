
/**
 * The main title screen.
 */
class LoseGame extends BaseState {

    preload() {
        // this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        // this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
        this._create_bg();

        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 'alagard', 'You were captured!', 50);
        title.anchor.setTo(0.5);

        let subtitle = this.game.add.bitmapText(CANVAS_WIDTH/2, 350, 'alagard', 'Press ENTER\n  to restart.', 30);
        subtitle.anchor.setTo(0.5);

        _global.keyboard.ENTER.onDown.add(() => {
            this.game.state.start("entranceLevel");
        });
    }

    _create_bg() {
        let map = this.game.add.tilemap('throneroomtilemap', 32, 32);
        map.addTilesetImage('window-w-sunset')
        map.addTilesetImage('throneroombg')
        map.addTilesetImage('ceiling')
        map.addTilesetImage('column')
        map.addTilesetImage('floor')
        map.addTilesetImage('lightin')
        map.addTilesetImage('throne')
        map.createLayer('wall');
        map.createLayer('windows');
        map.createLayer('columns');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(1, 1000, true, this.platforms);
    }


    update(){
    }

}
