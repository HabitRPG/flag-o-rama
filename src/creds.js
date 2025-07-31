'use strict';

var CLIENT_HEADER = 'Flag-o-Rama';

var habitica = require('./habitica');
var habiticaCreds = {
  id: localStorage.uuid,
  apiToken: localStorage.apiToken,
};

function saveUuid (id) {
  localStorage.uuid = id;
  habiticaCreds.uuid = id;
  habitica.setOptions({ id: id });
}

function saveApiToken (token) {
  localStorage.apiToken = token;
  habiticaCreds.apiToken = token;
  habitica.setOptions({ apiToken: token });
}

function hasCreds () {
  return Boolean(habiticaCreds.uuid && habiticaCreds.apiToken);
}

if (hasCreds) {
  habitica.setOptions({
    id: habiticaCreds.uuid,
    apiToken: habiticaCreds.apiToken,
    platform: CLIENT_HEADER,
  });
}

module.exports = {
  habiticaCreds: habiticaCreds,
  saveUuid: saveUuid,
  saveApiToken: saveApiToken,
  hasCreds: hasCreds
}
