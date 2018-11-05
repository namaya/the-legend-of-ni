export default {
  'world': {
    'bounds': { 'x': 4, 'y': 3 },
    'key': 'level1',
    'map': {
      'path': '/assets/maps/level1/map.json',
      'layers': [
        { 'name': 'brickwall', 'collidable': false },
        { 'name': 'wall', 'collidable': false },
        { 'name': 'lights', 'collidable': false },
        { 'name': 'windows', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 1, 'last': 3000 } }
      ],
      'assets': [
        { 'key': 'spikefloor', 'path': '/assets/maps/level1/spikefloor.png' },
        { 'key': 'tallspikefloor', 'path': '/assets/maps/level1/tallspikefloor.png' },
        { 'key': 'walllevel1', 'path': '/assets/maps/level1/walllevel1.png' },
        { 'key': 'levelceiling2', 'path': '/assets/maps/level1/levelceiling2.png' },
        { 'key': 'levelfloor2', 'path': '/assets/maps/level1/levelfloor2.png' },
        { 'key': 'levelbrick', 'path': '/assets/maps/level1/levelbrick.png' },
        { 'key': 'lightin', 'path': '/assets/maps/level1/lightin.png' },
        { 'key': 'ladder', 'path': '/assets/maps/level1/ladder.png' },
        { 'key': 'invisiblebricks', 'path': '/assets/maps/level1/invisiblebricks.png' },
        { 'key': 'window-w-red', 'path': '/assets/maps/level1/window-w-red.png' },
        { 'key': 'window-w-orange', 'path': '/assets/maps/level1/window-w-orange.png' },
        { 'key': 'window-w-yellow', 'path': '/assets/maps/level1/window-w-yellow.png' }
      ],
      'objects': {
        'door': { 'gid': 2920 },
        'ladders': { 'gid': 2920, 'image': 'ladder' },
        'treasure': { 'gid': 2920, 'image': 'treasure' },
        'rangers-small': { 'gid': 2920, 'image': 'ranger' },
        'spikes': { 'gid': 2920, 'image': 'spike-2' }
      }
    },
    'items': [
      { 'name': '' }
    ]
  }
}
