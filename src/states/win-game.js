
/**
 * The main title screen.
 */
class WinGame extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
       let map = this.game.add.tilemap('throne-room', 64, 64);
        map.addTilesetImage('castle');
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.createLayer('chandeliers');
        map.setCollisionBetween(2, 2, true, this.platforms)

        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 'alagard', 'You won!', 50);
        title.anchor.setTo(0.5);

        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();
    }
}
