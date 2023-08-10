const config = require('../config/server')

module.exports = {
  method: 'GET',
  path: '/static/{path*}',
  options: {
    cache: {
      expiresIn: config.staticCacheTimeoutMillis,
      privacy: 'private'
    }
  },
  handler: {
    directory: {
      path: [
        'app/assets/dist'
      ]
    }
  }
}
