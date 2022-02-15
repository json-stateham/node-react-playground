const { httpServer } = require('./utils/http-server')
const { sendSSE } = require('./controllers/sse-controller')
const { CORS_HEADERS } = require('./config')

const routing = {
  '^/$': {
    GET: (req, res) => {
      res.writeHead(200, {
        ...CORS_HEADERS,
        ...{ 'Content-Type': 'application/json' }
      })
      res.end(JSON.stringify({ message: 'FFF' }))
    }
  },
  '^/sse$': {
    GET: (req, res) => {
      res.writeHead(200, {
        ...CORS_HEADERS,
        ...{
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      })
      sendSSE(req, res)
    }
  },
  '.*': (req, res) => {
    res.writeHead(404, {
      ...CORS_HEADERS,
      ...{ 'Content-Type': 'application/json' }
    })
    res.end(JSON.stringify({ message: 'Not found' }))
  }
}

const server = httpServer(routing)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
