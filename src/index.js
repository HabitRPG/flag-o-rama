'use strict'

var params = require('./params')
var creds = require('./creds')
var habitica = require('./habitica')

var setupLogin = require('./setup-login')
var renderForm = require('./render-form')

if (!creds.hasCreds()) {
  setupLogin()
} else {
  habitica.user.get().then(function () {
    renderForm()
  }).catch(function (err) {
    $('#login').addClass('error')
    setupLogin()
  })
}

$('#logout-button').click(function () {
  if (!$('#flag-form').hasClass('hidden')) {
    $('#flag-form').transition('fade up', function () {
      setupLogin()
    })
  } else {
    $('#flagged-message').transition('fade up', function () {
      setupLogin()
    })
  }
})
