
class EntranceLevel extends BaseState {

    constructor(game) {
        super(game);
        this.xavier = _global.sprites.xavier;
        this.user_interface = _global.misc.user_interface;
    }

    create() {
        this.game.world.setBounds(0, 0, 512 * 3, 480 * 2);

        this._create_bg();
        this.user_interface.create();

        this.xavier.create();
        this.xavier.spawnArrows();

        this.game.camera.follow(this.xavier.sprite);
    }

    _create_bg() {
        let map = this.game.add.tilemap('entrance', 64, 64);
        map.addTilesetImage('bossentrancebackground');
        map.addTilesetImage('brickwall');
        map.addTilesetImage('spike32x64');
        
        map.createLayer('sunset');
        this.platforms = map.createLayer('bricks');
        map.createLayer('spikes');
        map.setCollisionBetween(1351, 1352, true, this.platforms);
    }

    update() {
        this.game.physics.arcade.collide(this.xavier.sprite, this.platforms);
        this.game.physics.arcade.collide(this.xavier.arrow1, this.platforms);
    
        this.xavier.update();
    
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);        
    }

}

function xavierDown(){
  this.xavier.arrow1.kill();
  this.game.state.start("loseGame");
}


function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}
