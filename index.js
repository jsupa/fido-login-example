const mongoose = require('mongoose')

const server = require('./app/lib/server')
const config = require('./config/settings/config')
const { log } = require('./app/lib/logger')

const app = {}

app.init = async () => {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(config.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    log('Connected to MongoDB', 'info', 'mongo.log')
  } catch (err) {
    log(err, 'error', 'mongo.log')

    process.exit(1)
  }

  log('App started')
  await server.init()
}

const start = async () => {
  log('Starting app...')

  await app.init()
}

start()
