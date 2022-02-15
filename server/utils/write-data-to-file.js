const fs = require('fs')

const writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', error => {
    if (error) console.error(error)
  })
}

module.exports = {
  writeDataToFile
}
