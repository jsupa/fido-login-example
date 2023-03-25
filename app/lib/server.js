const express = require('express')

const config = require('../../config/settings/config')
const { log } = require('./logger')
const routes = require('../../config/routes')
const helper = require('../server/helper')

const app = express()

helper.setHeader(app)
helper.defaults(app)
helper.layouts(app)
helper.logs(app)

module.exports.init = async () => {
  await routes.init(app).then(() => log('Routes loaded'))

  app.listen(config.web_port, () => {
    log(`Server started on port http://localhost:${config.web_port}`)
  })
}
