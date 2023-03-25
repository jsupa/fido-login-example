const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoDBStore = require('express-mongodb-session')(session)
const path = require('path')
const rfs = require('rotating-file-stream')

const config = require('../../config/settings/config')
const { version } = require('../../package.json')

const helper = {}

helper.setHeader = app => {
  app.use((req, res, next) => {
    helper.setVersion(res)
    helper.ignoreIps(req, res)

    next()
  })
}

helper.defaults = app => {
  app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf
      }
    })
  )
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(config.session_secret))
  app.set('trust proxy', true)

  helper.mongoStore(app)

  app.use((req, res, next) => {
    if (!req.session.views++) req.session.views = 1
    next()
  })
}

helper.layouts = app => {
  app.use(expressLayouts)
  app.use(express.static('./client/public'))
  app.set('view engine', 'ejs')
  app.set('views', './client/views')
  app.set('layout', './template')
}

helper.logs = app => {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '60d',
    path: path.resolve('./data/log')
  })

  morgan.token('body', req => JSON.stringify(req.body))
  morgan.token('headers', req => JSON.stringify(req.headers))
  morgan.token('session-id', req => req.sessionID)

  app.use(
    morgan(
      ':remote-addr - :remote-user (:session-id) [:date[clf]] ":method :url HTTP/:http-version :response-time ms" :referrer ":user-agent" BODY: :body HEADERS: :headers',
      {
        stream: accessLogStream
      }
    )
  )
}

helper.mongoStore = app => {
  app.use(
    session({
      secret: config.session_secret,
      name: 'oreo',
      resave: false,
      saveUninitialized: true,
      store: new MongoDBStore({
        uri: config.mongo_uri,
        collection: 'sessions'
      })
    })
  )
}

helper.ignoreIps = (req, res) => {
  const blacklist = config.ip_blacklist

  if (blacklist.includes(req.ip)) res.status(200).send('pong')
}

helper.setVersion = res => {
  res.setHeader('X-App-Version', version)
}

module.exports = helper
