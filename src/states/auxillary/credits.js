
import { global } from '../../legend-of-ni.js'
import BaseState from '../base.js'

/**
 * The main title screen.
 */
export default class Credits extends BaseState {
  create () {
    let image = this.game.add.sprite(0, 0, 'transitionBg')
    image.scale.setTo(1.15, 1)

    let producer = this.game.add.bitmapText(global.canvas.width / 2, global.canvas.height / 8, 'alagard', 'Producer: Paul Toprac', 50)
    producer.anchor.setTo(0.5)

    let student1 = this.game.add.bitmapText(global.canvas.width / 2, 150, 'alagard', 'Lead Designer: Emma Jaud', 30)
    student1.anchor.setTo(0.5)
      
    let student2 = this.game.add.bitmapText(global.canvas.width / 2, 200, 'alagard', 'Programmer: Nick Amaya', 30)
    student2.anchor.setTo(0.5)
      
    let student3 = this.game.add.bitmapText(global.canvas.width / 2, 250, 'alagard', 'Programmer: Jackie Ye', 30)
    student3.anchor.setTo(0.5)  
      
    let text = this.game.add.bitmapText(global.canvas.width / 2, 300, 'alagard', 'Thank You for Playing!', 30)
    text.anchor.setTo(0.5)    

      
  }
}
