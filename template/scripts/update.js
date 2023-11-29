'use strict'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const token = require('./utils/token')
const registerWidget = require('./utils/registerWidget')
const reader = require('./utils/read-config-stdin')

reader.readConfiguration(function (config) {
  token.getToken(config, function (sessionId) {
    registerWidget.update(config, sessionId)
  })
})
