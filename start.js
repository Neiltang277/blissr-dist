require('babel-register')({
  'presets': [
    'stage-3', ['env', {
      'targets': {
        'node': 'current'
      }
    }]
  ]
})

// require('babel-register')
require('babel-polyfill')
require('./server')
