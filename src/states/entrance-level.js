
class EntranceLevel extends BaseState {
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

        this.game.world.setBounds(0, 0, 512, 480);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;
     
        // this.platforms.create();
        this.xavier.create();

        this.ammoText = this.game.add.text(20, 20, 'Ammo:' + this.xavier.ammo);
        this.xavier.spawnArrows();
        
        

    }

    _create_bg() {

        let map = this.game.add.tilemap('entrance', 32, 32);
        console.log("after add tilemap");
        map.addTilesetImage('sunset');
        map.addTilesetImage('brickwall');
        map.addTilesetImage('spikes');
        
        map.createLayer('bg');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(2, 2, true, this.platforms);
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, this.platforms);
    
        this.xavier.update();
    
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);        
        this.ammoText.text = 'Ammo: ' + this.xavier.ammo;

    }


}

function xavierDown(){
  this.xavier.arrow1.kill();
  this.game.state.start("loseGame");
}


function collectArrow(){
  this.xavier.addArrows();
  this.ammoText.text = 'Ammo: ' + this.xavier.ammo;
  this.xavier.spawnArrows();
}
