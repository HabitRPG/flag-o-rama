'use strict'

var habitica = require('./habitica')
var habiticaCreds = {
  uuid: localStorage.uuid,
  apiToken: localStorage.apiToken
}

function saveUuid (id) {
  localStorage.uuid = id
  habiticaCreds.uuid = id
  habitica.setCredentials({ uuid: id })
}

function saveApiToken (token) {
  localStorage.apiToken = token
  habiticaCreds.apiToken = token
  habitica.setCredentials({ token: token })
}

function hasCreds () {
  return Boolean(habiticaCreds.uuid && habiticaCreds.apiToken)
}

if (hasCreds) {
  habitica.setCredentials({
    uuid: habiticaCreds.uuid,
    token: habiticaCreds.apiToken,
  })
}

module.exports = {
  habiticaCreds: habiticaCreds,
  saveUuid: saveUuid,
  saveApiToken: saveApiToken,
  hasCreds: hasCreds
}
