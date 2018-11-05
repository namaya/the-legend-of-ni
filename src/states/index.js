
import TutorialRoom from './levels/tutorial.js'
import Entrance from './levels/entrance-level.js'
import ThroneRoom from './levels/throne-room.js'

import Preload from './auxillary/preload.js'
import Title from './auxillary/title.js'
import WinGame from './auxillary/win-game.js'
import LoseGame from './auxillary/lose-game.js'

import Test from './levels/test.js'
import Level1 from './levels/Level1.js'

let states = {
  'preload': { 'State': Preload, 'isLevel': false },
  'title': { 'State': Title, 'isLevel': false },
  'winGame': { 'State': WinGame, 'isLevel': false },
  'loseGame': { 'State': LoseGame, 'isLevel': false },
  'tutorial': { 'State': TutorialRoom, 'isLevel': true },
  'entrance': { 'State': Entrance, 'isLevel': true },
  'throneRoom': { 'State': ThroneRoom, 'isLevel': true },
  'level1': { 'State': Level1, 'isLevel': true },
  'test': { 'State': Test, 'isLevel': true }
}

export default states
