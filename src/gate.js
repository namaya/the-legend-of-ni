let gate_Stats = {
    'open': false
};

export default class Gate {

    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.spritesheet('gate', 'assets/items/Gate Entrance.png',
            320, 448);
    }

    create() {
        this.sprite = this.game.add.sprite(800, 680, 'gate');
        this.sprite.scale.setTo(0.35); 
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        
        this.sprite.animations.add('closed', [0]);
        this.sprite.animations.add('open', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.immovable = true;
        this.sprite.body.moves = false;

        gate_Stats.open = false;
                
    }

    update() {
        // if(!gate_Stats.open){
        //     this.sprite.animations.play('closed', 10, true);    
        // }
        // else{
        //     this.sprite.animations.play('open', 10, false);        
        // }
    }
    
    opened(){
        gate_Stats.open = true;
        this.sprite.animations.play('open', 10, false);        
    }
}
