const getParamId = req => {
  const { length, [length - 1]: id } = req.url.split('/')
  return id
}

module.exports = {
  getParamId
}
