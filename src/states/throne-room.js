
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game, xavier, megaknight) {
        super(game);
        this.xavier = xavier;
        this.megaknight = megaknight;
    }

    preload() {
        // this.xavier.preload();
        // // this.platforms.preload();
        // this.megaknight.preload();
    }

    create() {
        this._create_bg();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;
        this.ouch = this.game.add.audio("ouch");

        // this.platforms.create();
        this.xavier.create();
        this.megaknight.create();
        this.xavier.spawnArrows();
        /*
        this.rocks = game.add.group();
        this.rocks.enableBody = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 100, addFallingRocks, this);
        */
    }

    _create_bg() {
        let map = this.game.add.tilemap('room', 64, 64);
        map.addTilesetImage('castle');
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(2, 2, true, this.platforms)
        map.createLayer('chandeliers');
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, this.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, this.platforms);
        this.game.physics.arcade.overlap(this.xavier.arrows, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            this.megaknight.damage();
            this.ouch.play();
        });

        this.xavier.update();
        this.megaknight.update();

        if (this.megaknight.isDead()) {
            this.game.state.start("winGame");
        }

        this.game.physics.arcade.overlap(this.megaknight.sprite,  this.xavier.sprite, xavierDown, null, this);
        this.game.physics.arcade.overlap(this.megaknight.weapon, this.xavier.sprite, xavierDown, null, this);
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);
        //this.game.physics.arcade.overlap(this.xavier.sprite,  this.rocks, xavierDown, null, this);

    }
}

function xavierDown(){
  this.xavier.arrow1.kill();
  this.game.state.start("loseGame");
}

/*
function addFallingRocks(){
    var rock = rocks.create(Math.random() * CANVAS_WIDTH, 0, 'rock');
    rock.body.gravity.y = 300;
}
*/

function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}
