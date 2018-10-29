
import { global } from "../../legend-of-ni.js";
import stats from "../../../conf/states/entrance.conf.js";

import BaseState from "../base.js";

export default class EntranceLevel extends BaseState {

    constructor(game) {
        super(game);

        this.xavier = global.sprites.xavier;
        this.megaknight = global.sprites.megaknight;
        this.user_interface = global.misc.user_interface;
        this.spring = global.sprites.spring;
        this.gate = global.sprites.gate;
        this.switchButton = global.sprites.switchButton;
    }

    globalPreload() {
        this.game.load.tilemap(stats.world.key, stats.world.map.path, null, Phaser.Tilemap.TILED_JSON);
        for (let asset of stats.world.assets) {
            this.game.load.image(asset.key, asset.path);
        }
    }

    create() {
        this._create_bg();
        this.user_interface.create();

        this.game.world.setBounds(0, 0, 512 * 3 - 100, 480 * 2);

        this.xavier.create();
        // this.spring.create();
        // this.gate.create();
        // this.switchButton.create();
                
        this.xavier.spawnArrows();    

        this.game.camera.follow(this.xavier.sprite);

        this.gateClosed = true;
    }

    _create_bg() {
        let map = this.game.add.tilemap(stats.world.key, 32, 32);

        for (let asset of stats.world.assets) {
            map.addTilesetImage(asset.key);
        }

        this.collidableGroups = [];

        for (let layer of stats.world.map.layers) {
            let layerGroup = map.createLayer(layer.name);

            if (layer.collidable) {
                map.setCollisionBetween(layer.collidableTileRange.first, 
                                        layer.collidableTileRange.last,
                                        true,
                                        layerGroup);

                this.collidableGroups.push(layerGroup)
            }
        }
    }

    update() {
        for (let collidableGroup of this.collidableGroups) {
            this.game.physics.arcade.collide(this.xavier.sprite, collidableGroup);
            this.game.physics.arcade.collide(this.xavier.arrow1, collidableGroup);
        }
        // this.game.physics.arcade.collide(this.spring.sprite, this.platforms);
        // this.game.physics.arcade.collide(this.gate.sprite, this.platforms);
        // this.game.physics.arcade.collide(this.switchButton.sprite, this.platforms);
        
        this.game.physics.arcade.collide(this.xavier.sprite, this.spikes);
       

        this.xavier.update();
        // this.spring.update();
        // this.gate.update(); 
        // this.switchButton.update();
        
        if (this.gateClosed) {
            // this.game.physics.arcade.collide(this.gate.sprite, this.xavier.sprite);
        }
        
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);
        
        // this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.switchButton.sprite, hitButton, null, this);
        
        // this.game.physics.arcade.overlap(this.xavier.sprite, this.spring.sprite, springBounce, null, this);

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
