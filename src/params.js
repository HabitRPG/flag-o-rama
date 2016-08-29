'use strict'

var parseUrl = require('url').parse
var url = window.location.href

var params = parseUrl(url, true).query

module.exports = params
