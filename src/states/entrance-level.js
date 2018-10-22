
class EntranceLevel extends BaseState {

    constructor(game, xavier, megaknight, spring, gate, switchButton) {
        super(game);
        this.xavier = xavier;
        this.megaknight = megaknight;
        this.user_interface = _global.misc.user_interface;
        this.spring = spring;
        this.gate = gate;
        this.switchButton = switchButton;
    }

    preload() {
    }

    create() {
        this._create_bg();
        this.user_interface.create();

        this.game.world.setBounds(0, 0, 512 * 3 - 100, 480 * 2);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;
     
        this.xavier.create();

        this.spring.create();
        this.gate.create();
        this.switchButton.create();
                
        this.xavier.spawnArrows();    

        this.game.camera.follow(this.xavier.sprite);

        this.gateClosed = true;
    }

    _create_bg() {
        let map = this.game.add.tilemap('entrance', 64, 64);
        map.addTilesetImage('bossentrancebackground');
        map.addTilesetImage('brickwall');
        map.addTilesetImage('spike32x64');
        
        map.createLayer('sunset');
        
        this.platforms = map.createLayer('bricks');
        map.setCollisionBetween(1351,1352, true, this.platforms);
        
        this.spikes = map.createLayer('spikes');
        map.setCollisionBetween(1353,1354, true, this.spikes);
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, this.platforms);
        this.game.physics.arcade.collide(this.spring.sprite, this.platforms);
        this.game.physics.arcade.collide(this.gate.sprite, this.platforms);
        this.game.physics.arcade.collide(this.switchButton.sprite, this.platforms);
        
        this.game.physics.arcade.collide(this.xavier.sprite, this.spikes);
       

        this.xavier.update();
        this.spring.update();
        this.gate.update(); 
        this.switchButton.update();
        
        if (this.gateClosed) {
            this.game.physics.arcade.collide(this.gate.sprite, this.xavier.sprite);
        }
        
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);
        
        this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.switchButton.sprite, hitButton, null, this);
        
        this.game.physics.arcade.overlap(this.xavier.sprite, this.spring.sprite, springBounce, null, this);
        
        // this.ammoText.text = 'Ammo: ' + this.xavier.ammo;
        
        if (this.xavier.sprite.x > 512 * 3 - 150) {
            this.game.state.start('throneRoom');
        }
    }

}


/*
function onSpike(){
    console.log("on spike");    
}
*/

function xavierDown(){
  this.xavier.arrow1.kill();
  this.game.state.start("loseGame");
}

function springBounce(){
  this.xavier.bounceSpring();
}

function hitButton(){
  this.switchButton.pressed();
  this.gate.opened();
  this.gateClosed = false;
}


function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}
