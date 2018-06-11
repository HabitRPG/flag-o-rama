'use strict'

var isUUID = require('validator').isUUID

var params = require('./params')
var habitica = require('./habitica')
var displayFlaggedMessage = require('./display-flagged-message')

var $flagForm = $('#flag-form')
var $groupId = $('#groupId')
var $chatId = $('#chatId')
var $userId = $('#userId')
var $chatMessageId = $('#chatMessageId')
var $submit = $('#submit-flag')

var $allFields = [$groupId, $chatId, $userId, $chatMessageId];

$groupId.val(params.groupId)
$chatId.val(params.chatId)
$userId.val(params.userId)
$chatMessageId.val(params.chatMessageId)

$allFields.map(($el) => $el.on('input', onInput));

$submit.on('click', function () {
  attemptToFlagMessage().then(function (res) {
    var flaggedMessage = res.data

    $submit.transition('fade up')
    $flagForm.transition('fade up', function () {
      displayFlaggedMessage(flaggedMessage)
    })
  }).catch(openFlagFormWithError)
})

function onInput () {
  $flagForm.removeClass('warning')
  $flagForm.removeClass('error')

  if (hasIds() && $submit.hasClass('hidden')) {
    $submit.transition('fade up in')
  } else if (!$submit.hasClass('hidden')) {
    $submit.transition('fade up out')
  }
}

$('#unflag-button').click(function () {
  habitica._connection.post('/groups/' + $groupId.val() + '/chat/' + $chatId.val() + '/clearflags').then(function (res) {
    $groupId.val('')
    $chatId.val('')

    $('#flag-form').addClass('warning')
    $('#flagged-message').transition('fade up', function () {
      renderForm()
    })
  }).catch(function (err) {
    console.log(err)
  })
})

function hasIds () {
  return (isUUID($groupId.val()) && isUUID($chatId.val()))
  || (isUUID($userId.val()) && isUUID($chatMessageId.val()))
}

function hideFormAndDisplayMessage (res) {
  $flagForm.removeClass('error')
  var flaggedMessage = res.data

  $flagForm.transition('fade up', function () {
    displayFlaggedMessage(flaggedMessage)
  })
}

function openFlagFormWithError (err) {
  $flagForm.addClass('error')
  $flagForm.find('.error.message > .header').html('Could not Flag')
  $flagForm.find('.error.message > .content').html('The chat message could not be flagged. This could be because the group or message does not exist or you do not have the right permissions to flag it.')

  if ($flagForm.hasClass('hidden')) {
    $flagForm.transition('fade up')
  }
}

function attemptToFlagMessage () {
  return $userId.val() 
    ? habitica._connection.post(`/members/flag-private-message/${$chatMessageId.val()}?userId=${$userId.val()}`)
    : habitica._connection.post(`/groups/${$groupId.val()}/chat/${$chatId.val()}/flag`)
}

function renderFlaggedMessage (res) {
}

function renderForm () {
  if (hasIds()) {
    attemptToFlagMessage().then(function (res) {
      var flaggedMessage = res.data

      displayFlaggedMessage(flaggedMessage)
    }).catch(openFlagFormWithError)
  } else {
    $flagForm.transition('fade up')
  }
}

module.exports = renderForm
