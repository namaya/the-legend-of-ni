
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.megaknight = _global.sprites.megaknight;
        this.user_interface = _global.misc.user_interface;
    }

    preload() {
        this.game.load.image('rock', 'assets/items/rock32x32.png');
    }

    create() {
        this.game.world.setBounds(0, 0, 1024, 640);

        this._create_bg();
        this.user_interface.create();

        this.ouch = this.game.add.audio("ouch");

        this.xavier.create();
        this.megaknight.create();

        this.xavier.spawnArrows();

        this.game.camera.follow(this.xavier.sprite);

        this.rocks = this.game.add.group();
        this.rocks.enableBody = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND, 100, addFallingRocks, this);
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

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, this.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, this.platforms);

        this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            this.megaknight.damage();
            this.ouch.play();
        });

        this.xavier.update();
        this.megaknight.update();

        if (this.megaknight.isDead()) {
            this.game.state.start("winGame");
        }

        this.game.physics.arcade.overlap(this.xavier.sprite, this.megaknight.sprite, this._xavierDown, null, this);
        this.game.physics.arcade.overlap(this.megaknight.weapon, this.xavier.sprite, this._xavierDown, null, this);
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);
        this.game.physics.arcade.overlap(this.xavier.sprite,  this.rocks, () => {
            this.xavier.damage();
        }, null, this);
    }

    _xavierDown(xavier, opponent) {
        // if (xavier.body.blocked.top) {
        //     console.log('top');
        // } else if (xavier.body.blocked.) {
        //     console.log('bottom');
        // } else if (xav)
        this.xavier.damage();
    }

}



function addFallingRocks(){
    var rock = this.rocks.create(Math.random() * CANVAS_WIDTH, 0, 'rock');
    rock.body.gravity.y = 300;
}

function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}
