
/**
 * The final boss map.
 */
class TutorialRoom extends BaseState {

    constructor(game, xavier, megaknight) {
        super(game);
        this.xavier = xavier;
        this.megaknight = megaknight;
    }

    preload() {
    }

    create() {
        this._create_bg();

        let text1 = this.game.add.bitmapText(CANVAS_WIDTH/2, 200, 'alagard', 'Press A/D to move.', 30);
        text1.anchor.setTo(0.5);

        let text2 = this.game.add.bitmapText(1000, 200, 'alagard', 'Press W to jump.', 30);
        text2.anchor.setTo(0.5);

        let text3 = this.game.add.bitmapText(2000, 200, 'alagard', 'Press K to shoot.', 30);
        text3.anchor.setTo(0.5);

        let text4 = this.game.add.bitmapText(3000, 200, 'alagard', 'Avoid enemies.', 30);
        text4.anchor.setTo(0.5);

        let text5 = this.game.add.bitmapText(3500, 200, 'alagard', 'Good luck.');

        this.game.world.setBounds(0, 0, 4096, 480);
 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;

        this.xavier.create();

        this.xavier.ammo = 9999;
        this.game.camera.follow(this.xavier.sprite);
    }

    _create_bg() {
        let map = this.game.add.tilemap('tutorial-room', 64, 64);
        map.addTilesetImage('castle');
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(2, 2, true, this.platforms);
        map.createLayer('chandeliers');
        this.door = map.createLayer('door');
        // map.setCollisionBetween(17, 17, false, this.door);
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.xavier.update();

        if (this.xavier.sprite.x > 3850) {
            this.game.state.start('throneRoom');
        }
    }
}
