const crypto = require('crypto')

const SEND_INTERVAL = 1000

const write = (res, eventId) => {
  res.write(`id: ${eventId}\n`)
  res.write(`data: ${new Date()}\n\n`)
}

const sendSSE = (_, res) => {
  const eventId = crypto.randomUUID()

  setInterval(() => {
    write(res, eventId)
  }, SEND_INTERVAL)

  write(res, eventId)
}

module.exports = {
  sendSSE
}
