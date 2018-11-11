
/**
 * Display stats on the screen.
 */

import { global } from './legend-of-ni.js'

class UserInterface {
  constructor (game) {
    this.game = game
  }


  create () {
      
    let stats_background = this.game.add.graphics();
    stats_background.fixedToCamera = true;

    stats_background.beginFill(0xFFFF33,1);
    stats_background.drawRect(0,0, 250, 140);
    stats_background.alpha = .5;  
  
    this.healthText = this.game.add.text(20, 20, 'Lives: ')
    this.healthText.fixedToCamera = true
    this.healthText.cameraOffset.setTo(20, 20)

    this.ammoText = this.game.add.text(20, 60, '')
    this.ammoText.fixedToCamera = true
    this.ammoText.cameraOffset.setTo(20, 60)

    this.powerText = this.game.add.text(20, 100, '')
    this.powerText.fixedToCamera = true
    this.powerText.cameraOffset.setTo(20, 100)

    this.game.onShoot.add(ammo => { this.ammoText.text = 'Ammo: ' + ammo }, this)
    this.game.onPlayerDamaged.add(numLives => { if(numLives == 2){
          this.heart3.destroy();
      }
      if(numLives == 1){
          this.heart2.destroy();
      }}, this)
    this.game.onPowerDelta.add(powerLevel => { this.powerText.text = 'Power: ' + powerLevel }, this)
          
    this.heart1 = this.game.add.sprite(50, 50, 'heart');
    this.heart1.scale.setTo(.05,.05);
    this.heart1.fixedToCamera = true;
    this.heart1.cameraOffset.setTo(95, 20);   
    
    this.heart2 = this.game.add.sprite(50, 50, 'heart');
    this.heart2.scale.setTo(.05,.05);
    this.heart2.fixedToCamera = true;
    this.heart2.cameraOffset.setTo(145, 20);   
    
    this.heart3 = this.game.add.sprite(50, 50, 'heart');
    this.heart3.scale.setTo(.05,.05);
    this.heart3.fixedToCamera = true;
    this.heart3.cameraOffset.setTo(195, 20);     
      
    this.heart1.inputEnabled = true;
    this.heart2.inputEnabled = true;
    this.heart3.inputEnabled = true;
      
      
  }
    
  update(){
    
      
  }
    
}



export default UserInterface
