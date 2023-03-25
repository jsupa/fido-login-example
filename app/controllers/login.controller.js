const base64url = require('base64url')
const passport = require('passport')
const { SessionChallengeStore } = require('passport-fido2-webauthn')

const store = new SessionChallengeStore()

const controller = {}

controller.index = async (req, res) => res.render('login/index')

controller.challange = async (req, res) => {
  store.challenge(req, (err, challenge) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      res.json({ challenge: base64url.encode(challenge) })
    }
  })
}

controller.pubKey = async (req, res, next) => {
  passport.authenticate('webauthn', {
    failureMessage: true,
    failWithError: true
  })(req, res, err => {
    if (err) {
      const cxx = Math.floor(err.status / 100)
      if (cxx !== 4) next(err)
      res.json({ ok: false, location: '/login' })
    } else {
      res.json({ ok: true, location: '/' })
    }
  })
}

controller.routes = [
  {
    method: 'get',
    path: '/',
    action: 'index'
  },
  {
    method: 'post',
    path: '/challange',
    action: 'challange'
  },
  {
    method: 'post',
    path: '/pub-key',
    action: 'pubKey'
  }
]

module.exports = controller
