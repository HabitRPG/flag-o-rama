'use strict'

var md = require('habitica-markdown')

var $msg = $('#flagged-message')
var $text = $('#flagged-message-text')
var $meta = $('#flagged-message-meta')

function displayFlaggedMessage (msg) {
  $text.html(md.render(msg.text))
  $meta.html('Posted by ' + msg.user)
  $msg.transition('fade up')
}

module.exports = displayFlaggedMessage
