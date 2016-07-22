'use strict';

var Figure = require('./Figure');
var FigureComponent = require('./FigureComponent');
var FigureTarget = require('./FigureTarget');
var FigureConverter = require('./FigureConverter');

module.exports = {
  name: 'figure',
  configure: function(config) {
    config.addNode(Figure);
    config.addComponent(Figure.type, FigureComponent);
    config.addComponent(Figure.type+'-target', FigureTarget);
    config.addConverter('jats', FigureConverter);
    config.addStyle(__dirname, '_figure.scss');
    config.addStyle(__dirname, '_figure-target.scss');
  }
};