
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.platforms = Platforms.forThroneRoom(this.game);
        this.xavier = _global.sprites.xavier;
        this.megaknight = _global.sprites.megaknight;
    }

    preload() {
        this.game.load.image('bg', 'assets/throne-room-bg.png');
        this.game.load.audio('boss_music','assets/sounds/bossmusic.mp3');
        this.game.load.audio('ouch','assets/sounds/ouch.mp3');
        //this.game.load.image('rock', 'assets/rock.png');


        this.xavier.preload();
        this.platforms.preload();
        this.megaknight.preload();
    }

    create() {
        this.bg = this.game.add.image(0, 0, 'bg');
        this.bg.scale.setTo(0.87, 1.2);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        this.ouch = this.game.add.audio("ouch");

        this.platforms.create();
        this.xavier.create();
        this.megaknight.create();
        this.xavier.spawnArrows();

        /*
        this.rocks = game.add.group();
        this.rocks.enableBody = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 100, addFallingRocks, this);
        */
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, Platforms.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, Platforms.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, Platforms.platforms);
        this.game.physics.arcade.overlap(this.xavier.arrows, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            this.megaknight.damage();
            this.ouch.play();
        });

        this.xavier.update();
        this.megaknight.update();

        if (this.megaknight.health == 0) {
          this.game.state.start("winGame");
        }

        this.game.physics.arcade.overlap(this.megaknight.sprite,  this.xavier.sprite, xavierDown, null, this);
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
