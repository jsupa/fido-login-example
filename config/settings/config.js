const config = {}

config.web_port = process.env.WEB_PORT || 3000
config.node_env = process.env.NODE_ENV || 'development'
config.session_secret = process.env.SESSION_SECRET || 'secret'

config.mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:1339/fido-dev-001'

config.ip_blacklist = ['46.36.41.219']

module.exports = config
