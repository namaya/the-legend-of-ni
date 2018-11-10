export default {
  'world': {
    'bounds': { 'x': 2, 'y': 1.3333 },
    'key': 'throneroomtilemap',
    'map': {
      'path': '/assets/maps/throne-room/throneroomtilemap4.json',
      'layers': [
        { 'name': 'wall', 'collidable': false },
        { 'name': 'windows', 'collidable': false },
        { 'name': 'columns', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 1, 'last': 1000 } }
      ],
      'assets': [
        { 'key': 'window-w-sunset', 'path': '/assets/maps/throne-room/window-w-sunset.png' },
        { 'key': 'throneroombg', 'path': '/assets/maps/throne-room/throneroombg.png' },
        { 'key': 'ceiling', 'path': '/assets/maps/throne-room/ceiling.png' },
        { 'key': 'column', 'path': '/assets/maps/throne-room/column.png' },
        { 'key': 'floor', 'path': '/assets/maps/throne-room/floor.png' },
        { 'key': 'lightin', 'path': '/assets/maps/throne-room/lightin.png' },
        { 'key': 'throne', 'path': '/assets/maps/throne-room/throne.png' },
        { 'key': 'wallbrick', 'path': '/assets/maps/throne-room/wallbrick.png' }
      ],
      'objects': {}
    }
  },
  'origin': { 'x': 5, 'y': 5 }
}
