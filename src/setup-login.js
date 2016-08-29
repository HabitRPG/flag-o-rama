'use strict'

var isUUID = require('validator').isUUID
var creds = require('./creds')
var habitica = require('./habitica')
var renderForm = require('./render-form')

var $login = $('#login')
var $uuid = $('#uuid-field')
var $token = $('#apiToken-field')
var $logoutBtn = $('#logout-button')

$uuid.on('input', function () {
  var value = this.value
  if (isUUID(value)) {
    creds.saveUuid(value)

    attemptToCloseLogin()
  }
})

$token.on('input', function () {
  var value = this.value
  if (isUUID(value)) {
    creds.saveApiToken(value)

    attemptToCloseLogin()
  }
})

function attemptToCloseLogin () {
  if (!creds.hasCreds()) {
    return
  } else {
    habitica.user.get().then(function () {
      $login.transition('fade up', function () {
        $logoutBtn.transition('fade')
        renderForm()
      })
    }).catch(function (err) {
      $login.addClass('error')
    })
  }
}

function setupLogin () {
  $logoutBtn.transition('fade')

  $login.transition('fade up')

  $uuid.val(creds.habiticaCreds.uuid)
  $token.val(creds.habiticaCreds.apiToken)
}

module.exports = setupLogin
