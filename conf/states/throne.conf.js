export default {
  'world': {
    'bounds': { 'x': 1024, 'y': 640 },
    'key': 'throneroomtilemap',
    'map': {
      'path': 'assets/maps/throneRoom/throneroomtilemap4.json',
      'layers': [
        { 'name': 'wall', 'collidable': false },
        { 'name': 'windows', 'collidable': false },
        { 'name': 'columns', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 1, 'last': 1000 } }
      ],
      'assets': [
        { 'key': 'window-w-sunset', 'path': 'assets/maps/throneRoom/window-w-sunset.png' },
        { 'key': 'throneroombg', 'path': 'assets/maps/throneRoom/throneroombg.png' },
        { 'key': 'ceiling', 'path': 'assets/maps/throneRoom/ceiling.png' },
        { 'key': 'column', 'path': 'assets/maps/throneRoom/column.png' },
        { 'key': 'floor', 'path': 'assets/maps/throneRoom/floor.png' },
        { 'key': 'lightin', 'path': 'assets/maps/throneRoom/lightin.png' },
        { 'key': 'throne', 'path': 'assets/maps/throneRoom/throne.png' },
        { 'key': 'wallbrick', 'path': 'assets/maps/throneRoom/wallbrick.png' }
      ],
      'objects': {}
    }
  },
  'origin': { 'x': 5, 'y': 5 }
}
