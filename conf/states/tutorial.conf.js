export default {
  'world': {
    'bounds': { 'x': 512 * 8, 'y': 480 },
    'key': 'tutorial',
    'map': {
      'path': '/assets/maps/tutorial/map.json',
      'layers': [
        { 'name': 'bg', 'collidable': false },
        { 'name': 'chandeliers', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 2, 'last': 2 } }
      ],
      'assets': [
        { 'key': 'castle', 'path': '/assets/maps/test/castle.png' }
      ],
      'objects': {
        'door': { 'gid': 3 },
        'knights-small': { 'gid': 3 }
      }
    }
  },
  'origin': { 'x': 5, 'y': 40 }
  // 'origin': { 'x': 3300, 'y': 40 }
}
