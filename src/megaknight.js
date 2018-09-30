

let knights_stats = {
    'walk_speed': 200,
    x: 50, y: 5,
    'animation_speed': 8,
    'health_bar': 10
};

class MegaKnight {

    constructor(game) {
        this.game = game;
        this.arrows = [];
    }
    ///leaving in a temporary sprite (santa clause)
    preload() {
        this.game.load.spritesheet('megaknight', 'assets/megaknight.png', 280, 368);
        this.game.load.audio('ouch', 'assets/ouch.mp3');
    }

    create() {
        this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.animations.add('walk', [0, 1, 2, 3]);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.scale.setTo(0.3, 0.3);
        ouch = game.add.audio('ouch');

    }

    update() {

        //if the boss hits the right boundary, switch direction
        if(this.sprite.body.x > 350){
          knights_stats.walk_speed *= -1;
          this.sprite.scale.setTo(-0.3, 0.3);
          }

        //if the boss hits the left boundary, switch direction
        if(this.sprite.body.x < 50){
          knights_stats.walk_speed *= -1;
          this.sprite.scale.setTo(0.3, 0.3);
          }


        this.sprite.body.velocity.x = knights_stats.walk_speed;
        this.sprite.animations.play('walk', knights_stats.animation_speed, true);

        //if hit
        //game.physics.arcade.overlap(this.sprite,  arrow, bossDamaged, null, this);


    }


}


///WIP below for damaged health bar and audio reaction
// '''
// function bossDamaged(this.sprite, arrow){
//     this.sprite.knights_stats.health_bar -= 1;
//     ouch.play();
// }
// '''
