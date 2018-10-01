
/**
 * The final boss map.
 */
class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.platforms = Platforms.forThroneRoom(this.game);
        this.megaknight = _global.sprites.megaknight;


    }

    preload() {
        this.xavier.preload();
        this.platforms.preload();
        this.game.load.audio('boss_music','assets/sounds/bossmusic.mp3');
        this.game.load.audio('ouch','assets/sounds/ouch.mp3');

        this.megaknight.preload();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        this.platforms.create();
        this.xavier.create();
        this.megaknight.create();
        this.ouch = this.game.add.audio("ouch");

    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, Platforms.platforms);
        this.game.physics.arcade.collide(this.megaknight.sprite, Platforms.platforms);

        this.game.physics.arcade.collide(this.xavier.arrows, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            console.log(arrow);
            this.megaknight.damage();
            this.ouch.play();
        });


        this.game.physics.arcade.collide(this.xavier.arrows, Platforms.platforms, arrow => {
            arrow.body.velocity.x = 0;
            arrow.body.velocity.y = 0;
            arrow.body.angle = 180;
        })

        this.xavier.update();
        this.megaknight.update();

        if(this.megaknight.health == 0){
          this.game.state.start("winGame");
        }



        this.game.physics.arcade.overlap(this.megaknight.sprite,  this.xavier.sprite, xavierDown, null, this);


    }
}

function xavierDown(){
  this.game.state.start("loseGame");


}
