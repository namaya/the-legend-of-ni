export default {
  'world': {
    'bounds': { 'x': 1, 'y': 1 },
    'key': 'test',
    'map': {
      'path': '/assets/maps/test/map.json',
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
    },
    'items': [
      { 'name': '' }
    ]
  },
  'origin': { 'x': 5, 'y': 40 }
}
