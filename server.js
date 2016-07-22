'use strict';

/* eslint-disable no-console */

var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 5001;
var serverUtils = require('substance/util/server');
var app = express();

// Writer example integration
serverUtils.serveStyles(app, '/jats-editor/app.css', {
  rootDir: __dirname,
  configuratorPath: require.resolve('./packages/scientist/ScientistConfigurator'),
  configPath: require.resolve('./examples/jats-editor/package')
});
serverUtils.serveJS(app, '/jats-editor/app.js', path.join(__dirname, 'examples/jats-editor', 'app.js'), {
  jsx: true,
  es6: "modules"
});
serverUtils.serveHTML(app, '/jats-editor', path.join(__dirname, 'examples/jats-editor', 'index.html'), {});

serverUtils.serveStyles(app, '/science-writer/app.css', {
  rootDir: __dirname,
  configuratorPath: require.resolve('./packages/scientist/ScientistConfigurator'),
  configPath: require.resolve('./examples/science-writer/package'),
});
serverUtils.serveJS(app, '/science-writer/app.js', path.join(__dirname, 'examples/science-writer', 'app.js'), {
  jsx: true,
  // we can rely on native es6 support
  // only imports/exports need to be transpiled
  // for compatibility with browserify
  es6: "modules"
});
serverUtils.serveHTML(app, '/science-writer', path.join(__dirname, 'examples/science-writer', 'index.html'), {});

// static served data
app.use('/data', express.static(path.join(__dirname, 'examples/data')));
app.use(express.static(path.join(__dirname, 'examples')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));

serverUtils.serveTestSuite(app, "test/**/*.test.js");

app.listen(PORT);
console.log('Server is listening on %s', PORT);
console.log('To view the docs go to http://localhost:%s', PORT);
