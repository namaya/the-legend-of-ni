export default {
  'world': {
    'bounds': { 'x': 4, 'y': 3 },
    'key': 'level2',
    'map': {
      'path': '/assets/maps/level2/map.json',
      'layers': [
        { 'name': 'wall', 'collidable': false },
        { 'name': 'brickwall', 'collidable': false },
        { 'name': 'windows', 'collidable': false },
        { 'name': 'lights', 'collidable': false },
        { 'name': 'columns', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 1, 'last': 100000 } }
      ],
      'assets': [
        { 'key': 'level2brick', 'path': '/assets/maps/level2/level2brickk.png' },
        { 'key': 'level2brickwall', 'path': '/assets/maps/level2/level2brickwall.png' },
        { 'key': 'level2ceiling', 'path': '/assets/maps/level2/level2ceiling.png' },
        { 'key': 'level2floor', 'path': '/assets/maps/level2/level2floor.png' },
        { 'key': 'level2invisiblebrick', 'path': '/assets/maps/level2/level2invisiblebrick.png' },
        { 'key': 'wall', 'path': '/assets/maps/level2/wall.png' },
        { 'key': 'level2floorbrick', 'path': '/assets/maps/level2/level2floorbrick.png' },
        { 'key': 'window-w-red', 'path': '/assets/maps/level1/window-w-red.png' },
        { 'key': 'window-w-orange', 'path': '/assets/maps/level1/window-w-orange.png' },
        { 'key': 'window-w-yellow', 'path': '/assets/maps/level1/window-w-yellow.png' },
        { 'key': 'lightin', 'path': '/assets/maps/level1/lightin.png' }
      ],
      'objects': {
        // 'door': { 'gid': 2920 },
        // 'ladders': { 'gid': 2920, 'image': 'ladder' },
        // 'treasure': { 'gid': 2920, 'image': 'treasure' },
        // 'rangers-small': { 'gid': 2920, 'image': 'ranger' },
        'spikes': { 'gid': 14, 'image': 'spike-3' },
        'switches': { 'gid': 14, 'image': 'switch' },
        'springs': { 'gid': 14, 'image': 'spring' }
      }
    },
    'items': [
      { 'name': '' }
    ]
  },
  'origin': { 'x': 500, 'y': 50 }
}
