const config = require('./config')
const enableDestroy = require('server-destroy')

process.title = 'idomsoft-test'

const server = require('./server')(config.host, config.port)

enableDestroy(server)

const shutdown = () => {
  server.destroy(() => {
    console.info('Server stopped')
    process.exit(0)
  })
}

// SIGTERM handler
process.on('SIGTERM', () => {
  console.info('Caught SIGTERM, exiting...')
  shutdown()
})

// SIGINT handler (CTRL-C)
process.on('SIGINT', () => {
  console.info('Caught SIGINT, exiting...')
  shutdown()
})
