'use strict'

var md = require('habitica-markdown')

var $msg = $('#flagged-message')
var $text = $('#flagged-message-text')
var $meta = $('#flagged-message-meta')

function displayFlaggedMessage (msg) {
  var postedBy;

  if (msg.user) {
    postedBy = 'Posted by ' + msg.user;
  } else {
    postedBy = 'System Message';
  }

  $text.html(md.render(msg.text))
  $meta.html(postedBy)
  $msg.transition('fade up')
}

module.exports = displayFlaggedMessage
