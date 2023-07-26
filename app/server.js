const hapi = require('@hapi/hapi')
const config = require('./config/server')

async function createServer () {
  // Create the hapi server
  const serverOptions = {
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  }

  const server = hapi.server(serverOptions)

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))

  return server
}

module.exports = createServer
