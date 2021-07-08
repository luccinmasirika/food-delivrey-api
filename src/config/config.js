const dotenv = require('dotenv').config()

const SERVICE_HOST = process.env.HOST || 'localhost'
const SERVICE_API = process.env.API || 'http://localhost:8000'
const SERVICE_PORT = process.env.PORT || 8000
const SERVICE_DATABASE = process.env.MONGO_URI || process.env.LOCAL_DB
const SERVICE_SECRET = process.env.SECRET
const SERVICE_NODE = process.env.NODE_ENV

const SERVER = { host: SERVICE_HOST, port: SERVICE_PORT, api: SERVICE_API, node: SERVICE_NODE  }

const DATABASE = { uri: SERVICE_DATABASE }

const SECRET = { signedTokenString: SERVICE_SECRET }

exports.config = { server: SERVER, database: DATABASE, secret: SECRET }
