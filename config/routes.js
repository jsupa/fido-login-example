/* eslint-disable global-require */
const express = require('express')

const routes = {}

module.exports.init = async app => {
  app.get('/', (req, res) => {
    if (req.session.user) res.redirect('/accounts')
    res.redirect('/login')
  })

  await routes.generateRoutes(app)

  app.get('/ping' || '/health', (req, res) => res.send('pong'))

  routes.notFound(app)
}

routes.generateRoutes = async app => {
  routes.accounts(app)
  routes.login(app)
  routes.signup(app)
}

routes.generateController = controller => {
  const router = express.Router()

  router.use((req, res, next) => {
    // ? controller.auth(req, res, next)
    next()
  })

  controller.routes.forEach(route => {
    router[route.method](route.path, controller[route.action])
  })

  return router
}

routes.accounts = app => {
  const controller = require('../app/controllers/account.controller')

  app.use('/accounts', routes.generateController(controller))
}

routes.login = app => {
  const controller = require('../app/controllers/login.controller')

  app.use('/login', routes.generateController(controller))
}

routes.signup = app => {
  const controller = require('../app/controllers/signup.controller')

  app.use('/signup', routes.generateController(controller))
}

routes.notFound = app => {
  app.use((req, res) => {
    res.status(404).render('errors/404')
  })
}
