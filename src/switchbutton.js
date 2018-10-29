let button_Stats = {
    'pressed': false
};

export default class SwitchButton {

    constructor(game) {
        this.game = game;
    }
    preload() {
        this.game.load.spritesheet('switch', 'assets/items/Switch96x32.png',
            96, 32);
    }

    create() {
        this.sprite = this.game.add.sprite(930, 680, 'switch');
        this.sprite.scale.setTo(0.5); 
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        
        this.sprite.animations.add('open', [0]);
        this.sprite.animations.add('pressed', [1]);
        
        this.sprite.body.collideWorldBounds = true;
        button_Stats.pressed = false;
    }

    update() {
        if(!button_Stats.pressed){
            this.sprite.animations.play('open', 1, true);
        }
        else{
            this.sprite.animations.play('pressed', 1, true);
            
        }
    }
    
    pressed(){
        button_Stats.pressed = true;
    }
    
    
    
    
}
