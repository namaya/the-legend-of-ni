
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
        this.game.load.audio('boss_music','assets/sounds/bossmusic.mp3');
        //jackie
        this.megaknight.preload();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        this.platforms.create();
        this.xavier.create();
        this.megaknight.create();

    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, Platforms.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, Platforms.platforms);

        this.game.physics.arcade.collide(this.xavier.arrows, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            console.log(arrow);
            this.megaknight.damage();
        });


        this.game.physics.arcade.collide(this.xavier.arrows, Platforms.platforms, arrow => {
            arrow.body.velocity.x = 0;
            arrow.body.velocity.y = 0;
            arrow.body.angle = 180;
        })

        this.xavier.update();
        this.megaknight.update();
    }
}
