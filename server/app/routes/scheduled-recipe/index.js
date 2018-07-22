'use strict';

const Helper = require('./helper');

// Make the plugin by injecting the helper.
module.exports = require('./factory')(Helper);
