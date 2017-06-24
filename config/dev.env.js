var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: JSON.stringify('80bdab0ecb2b65b57e1629f1b65cb3f1'),
  NODE_ENV: '"development"',
  PLAYLIST_KEY: 'saved-playlist',
})
