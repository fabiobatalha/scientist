'use strict';

var substanceGlobals = require('substance/util/substanceGlobals');
substanceGlobals.DEBUG_RENDERING = true;

var Scientist = require('../../packages/scientist/Scientist');
var ScientistConfigurator = require('../../packages/scientist/ScientistConfigurator');
var JATSEditorPackage = require('./package');

var configurator = new ScientistConfigurator().import(JATSEditorPackage);

window.onload = function() {
  window.app = Scientist.mount({
    mode: 'publisher',
    documentId: 'elife-00007',
    configurator: configurator
  }, document.body);
};
