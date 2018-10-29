
/**
 * The main title screen.
 */
class WinGame extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
        this._create_bg();

        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 'alagard', 'You won!', 50);
        title.anchor.setTo(0.5);

        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();
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

}
