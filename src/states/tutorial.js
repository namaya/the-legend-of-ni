
/**
 * The final boss map.
 */
class TutorialRoom extends BaseState {

    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.user_interface = _global.misc.user_interface;
    }

    create() {
        this.game.world.setBounds(0, 0, 4096, 480);
 
        this._create_bg();
        this.user_interface.create();

        let text1 = this.game.add.bitmapText(CANVAS_WIDTH/2, 200, 'alagard', 'Press A/D to move.', 30);
        text1.anchor.setTo(0.5);

        let text2 = this.game.add.bitmapText(1000, 200, 'alagard', 'Press W to jump.', 30);
        text2.anchor.setTo(0.5);

        let text3 = this.game.add.bitmapText(2000, 200, 'alagard', '          Press K to shoot.\n\n Hold SPACEBAR to adjust power.', 30);
        text3.anchor.setTo(0.5);

        let text4 = this.game.add.bitmapText(3000, 200, 'alagard', 'Avoid enemies.', 30);
        text4.anchor.setTo(0.5);

        let text5 = this.game.add.bitmapText(3500, 200, 'alagard', 'Good luck.');

        let text6 = this.game.add.bitmapText(CANVAS_WIDTH/2, 250, 'alagard', 'Press Enter to skip tutorial.', 30);
        text6.anchor.setTo(0.5);

        this.xavier.create();

        this.enemy = this.game.add.sprite(3000, knights_stats.y, 'megaknight');
        this.enemy.scale.setTo(0.5);
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.animations.add('walk-left', [5, 6, 7, 8]);
        this.enemy.body.collideWorldBounds = true;
        this.enemy.animations.play('walk-left', knights_stats.animation.speed, true);

        this.game.camera.follow(this.xavier.sprite);
        
        _global.keyboard.ENTER.onDown.add(() => {
            this.game.state.start("entranceLevel");
        });
    }

    _create_bg() {
        let map = this.game.add.tilemap('tutorial-room', 64, 64);
        map.addTilesetImage('castle');
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(2, 2, true, this.platforms);
        map.createLayer('chandeliers');
        this.door = map.createLayer('door');
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.enemy, this.platforms);

        this.game.physics.arcade.collide(this.xavier.sprite, this.enemy, () => {
            this.game.state.start('tutorial');
        });

        this.xavier.update();

        if (this.xavier.sprite.x > 3850) {
            this.game.state.start('entranceLevel');
        }
    }
}
