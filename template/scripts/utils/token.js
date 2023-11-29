'use strict'

const axios = require('axios').default

function Request(cb) {
  this.then(function(response) {
    console.log('#### RESPONSE (token) ####')
    console.log('StatusCode:' + response.status)
    cb(response.data)
  })
  this.catch(function(error) {
    console.log('#### ERROR (token) ####')
    cb(error)
  })
  return this
}

function getToken(config, user, cb) {
  console.log(JSON.stringify(config))
  console.log(JSON.stringify(user))
  const requestConfig = {
    method: 'post',

    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (config.apiNorth) {
    requestConfig.url = config.apiNorth + '/north/v80/provision/users/login'
    requestConfig.data = {
      email: user.email,
      password: user.password
    }
    Request.call(axios(requestConfig), function({ user }) {
      user.north_api_url = config.apiNorth
      const requestConfig = {
        method: 'post',
        url: config.apiWebUrl + '/api/auth/signin/internal',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`
        },
        data: user
      }
      Request.call(axios(requestConfig), function(_user) {
        cb(user)
      })
    })
  } else {
    requestConfig.url = config.apiWebUrl + '/api/signin?getHash=true'
    requestConfig.data = user
    Request.call(axios(requestConfig), cb)
  }
}

module.exports.getToken = function (config, cb) {
  const _user = {
    email: config.user,
    password: config.password,
    domain: config.domain,
    profile: 'wiwi'
  }

  getToken(config, _user, function (userWithToken) {
    let token
    if (config.apiNorth) { token = userWithToken.jwt } else { token = userWithToken.token }
    console.log('TOKEN', token)
    cb(token)
  })
}
