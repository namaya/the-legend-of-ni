
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.platforms = Platforms.forThroneRoom(this.game);
        //jackie
        this.megaknight = _global.sprites.megaknight;


    }

    preload() {
        this.xavier.preload();
        this.platforms.preload();
        this.game.load.audio('boss_music','assets/bossmusic.mp3');
        //jackie
        this.megaknight.preload();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 300;

        this.platforms.create();
        this.xavier.create();
        this.megaknight.create();

    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, Platforms.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, Platforms.platforms);

        this.xavier.update();
        this.megaknight.update();
    }
}
