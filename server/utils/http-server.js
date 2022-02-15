const http = require('http')

const httpServer = routingMap =>
  http.createServer((req, res) => {
    const route =
      routingMap[
        Object.keys(routingMap).find(path => req.url.match(new RegExp(path)))
      ]

    if (!route[req.method]) {
      return route(req, res)
    }

    return route[req.method](req, res)
  })

module.exports = {
  httpServer
}
