
var fs = require("fs");
var path = require("path");
var sass = require('node-sass');
var clone = require('lodash/clone');
var extend = require('lodash/extend');
var bundleJS = require('substance/util/bundleJS')

var browserifyConfig = require('./package').browserify;
var babelConfig = clone(require('./package').babel);

// Writer example integration
bundleCSS({
  rootDir: __dirname,
  configuratorPath: require.resolve('./packages/scientist/ScientistConfigurator'),
  configPath: require.resolve('./examples/jats-editor/package'),
  babel: babelConfig,
  browserify: browserifyConfig,
}, function(err) {
  if (err) console.error(err);
});

function bundleCSS(params, cb) {
  var source = [
    "global.__getStyleFiles__() {",
    "  var Configurator = require('"+params.configuratorPath+"');",
    "  var MainPackage = require('"+params.configPath+"');",
    "  var configurator = new Configurator().import(MainPackage);",
    "  var scssFiles = configurator.getStyles();",
    "  return scssFiles;",
    "}"
  ].join('\n');
  // var tmpFile = path.join(os.tmpdir(), '__getStyleFiles__.js');
  var tmpFile = '__getStyleFiles__.js';
  fs.writeFileSync(tmpFile, source);
  params = clone(params);
  params.sourcePath = tmpFile;
  var startTime = Date.now();
  bundleJS(params, function(err, js) {
    console.log('### BUNDLED JS');
    fs.writeFileSync('__blupp.js', js);
    fs.unlinkSync(tmpFile);
    if (err) return cb(err);
    try {
      var getStyleFiles = new Function([
        js,
        "return __getStyleFiles__();"
      ].join('\n'));
      params.styleFiles = getStyleFiles();
      console.log('### styleFiles ', params.styleFiles);
      console.info('... extracting style files took %s ms', Date.now()-startTime);
      _bundleSass(params, cb);
    } catch (_err) {
      cb(_err);
    }
  });
}

function _bundleSass(params, cb) {
  var startTime = Date.now();
  var sassOptions = {};
  // per default source maps are enabled and embedded
  // only if explicitely disabled this is not done
  if (!params.sass || params.sass.sourceMap !== false) {
    sassOptions = {
      sourceMap: true,
      sourceMapEmbed: true,
      sourceMapContents: true,
    };
  }
  sassOptions = extend(sassOptions, params.sass);
  var rootDir = params.rootDir;
  var scssFiles = params.styleFiles;
  var scssContent = scssFiles.map(function(scssFile) {
    var relPath = String(path.relative(rootDir, scssFile)).split(path.sep).join('/');
    return "@import '"+relPath+"';";
  }).join('\n');
  sassOptions.data = scssContent;
  sass.render(sassOptions, function(err, result) {
    if (err) cb(err);
    else {
      console.info('... processing with sass %s ms', Date.now()-startTime);
      cb(null, result.css);
    }
  });
}
