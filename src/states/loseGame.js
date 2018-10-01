
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


        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();

    }
}
