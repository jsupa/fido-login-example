const uuid = require('uuid')
const base64url = require('base64url')
const { SessionChallengeStore } = require('passport-fido2-webauthn')

const store = new SessionChallengeStore()

const controller = {}

controller.challange = async (req, res) => {
  const { username } = req.body
  console.log(username)
  let handle = Buffer.alloc(16)
  handle = uuid.v4({}, handle)
  const user = {
    id: handle,
    name: username,
    displayName: username
  }

  store.challenge(req, { user }, (err, challenge) => {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    } else {
      user.id = base64url.encode(user.id)
      res.json({ challenge: base64url.encode(challenge), user })
    }
  })
}

controller.routes = [
  {
    method: 'post',
    path: '/challange',
    action: 'challange'
  }
]

module.exports = controller
