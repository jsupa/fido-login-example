const WebAuthnStrategy = require('passport-fido2-webauthn')
const { SessionChallengeStore } = require('passport-fido2-webauthn')
const passport = require('passport')

const store = new SessionChallengeStore()

module.exports.init = async app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

passport.use(
  new WebAuthnStrategy(
    { store },
    (id, user, cb) => {
      console.log('verify', id, user)
    },
    (user, id, pubkey, cb) => {
      console.log('register', user, id, pubkey)
    }
  )
)
