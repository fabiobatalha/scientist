'use strict';

var Body = require('./Body');
var BodyConverter = require('./BodyConverter');
var BodyComponent = require('./BodyComponent');

module.exports = {
  name: 'body',
  configure: function(config) {
    config.addNode(Body);
    config.addComponent(Body.type, BodyComponent);
    config.addConverter('jats', BodyConverter);
  }
};