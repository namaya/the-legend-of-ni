
/**
 * The main title screen.
 */
class loseGame extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
        //this.game.stage.backgroundColor = 0xf4ebca;

        let title = this.game.add.bitmapText(CANVAS_WIDTH/2, 100, 'alagard', 'You were captured!', 50);
        title.anchor.setTo(0.5);


        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();





    }
}
