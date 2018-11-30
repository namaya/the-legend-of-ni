
import TutorialRoom from './levels/tutorial.js'
import Entrance from './levels/entrance-level.js'
import ThroneRoom from './levels/throne-room.js'

import Preload from './auxillary/preload.js'
import Title from './auxillary/title.js'

import Castle1Title from './auxillary/Castle1-title.js'
import Castle2Title from './auxillary/Castle2-title.js'
import EntranceTitle from './auxillary/Entrance-title.js'
import BossTitle from './auxillary/Boss-title.js'


import WinGame from './auxillary/win-game.js'
import LoseGame from './auxillary/lose-game.js'

import Test from './levels/test.js'
import Level1 from './levels/Level1.js'
import Level2 from './levels/Level2.js'

let states = {
  'preload': { 'State': Preload, 'isLevel': false },
  'title': { 'State': Title, 'isLevel': false },
    
  'Castle1Title': { 'State': Castle1Title, 'isLevel': false },
  'Castle2Title': { 'State': Castle2Title, 'isLevel': false },
  'BossTitle': { 'State': BossTitle, 'isLevel': false },
  'EntranceTitle': { 'State': EntranceTitle, 'isLevel': false },
    
    
  'winGame': { 'State': WinGame, 'isLevel': false },
  'loseGame': { 'State': LoseGame, 'isLevel': false },
  'tutorial': { 'State': TutorialRoom, 'isLevel': true },
  'entrance': { 'State': Entrance, 'isLevel': true },
  'throneRoom': { 'State': ThroneRoom, 'isLevel': true },
  'level1': { 'State': Level1, 'isLevel': true },
  'level2': { 'State': Level2, 'isLevel': true },
  'test': { 'State': Test, 'isLevel': true }
}

export default states
