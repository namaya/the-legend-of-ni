
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.platforms = Platforms.forThroneRoom(this.game);
    }

    preload() {
        this.xavier.preload();
        this.platforms.preload();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 300;

        this.platforms.create();
        this.xavier.create();
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, Platforms.platforms);

        this.xavier.update();
    }
}