'use strict'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const { isObject } = require('lodash')
const token = require('./utils/token')
const registerWidget = require('./utils/registerWidget')
const action = process.argv[2]

function finEnv(env) {
  const map = {
    develop: {
      apiWebUrl: 'https://developv8.opengate.es',
      apiNorth: 'https://developv8.opengate.es'
    },
    default: {
      apiWebUrl: 'http://localhost:3977',
      apiNorth: 'https://odmux01.amplia.int'
    }
  }
  return map[env] || env
}

const uris = finEnv(process.argv[3])
let config = {}
if (isObject(uris)) {
  config = {
    ...uris,
    meta: 'meta-widget.json',
    domain: process.argv[4],
    user: process.argv[5],
    password: process.argv[6]
  }
} else {
  config = {
    apiWebUrl: process.argv[3],
    meta: 'meta-widget.json',
    domain: process.argv[4],
    user: process.argv[5],
    password: process.argv[6],
    apiNorth: process.argv[7]
  }
}

token.getToken(config, function(sessionId) {
  switch (action) {
    case 'update':
      registerWidget.update(config, sessionId)
      break
    case 'register':
      registerWidget.register(config, sessionId)
      break
    case 'delete':
      registerWidget.delete(config, sessionId)
      break
    default:
      break
  }
})
