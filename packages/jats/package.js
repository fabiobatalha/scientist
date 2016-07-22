import JATSImporter from './JATSImporter'
import JATSExporter from './JATSExporter'

export default {
  name: 'jats',
  configure: function(config) {
    config.import(require('./article/package'))
    config.import(require('./article-meta/package'))
    config.import(require('./title-group/package'))
    config.import(require('./article-title/package'))
    config.import(require('./contrib-group/package'))
    config.import(require('./contrib/package'))
    config.import(require('./back/package'))
    config.import(require('./body/package'))
    config.import(require('./bold/package'))
    config.import(require('./caption/package'))
    config.import(require('./xref/package'))
    config.import(require('./ext-link/package'))
    config.import(require('./figure/package'))
    config.import(require('./footnote/package'))
    config.import(require('./front/package'))
    config.import(require('./graphic/package'))
    config.import(require('./italic/package'))
    config.import(require('./label/package'))
    config.import(require('./monospace/package'))
    config.import(require('./paragraph/package'))
    config.import(require('./ref/package'))
    config.import(require('./ref-list/package'))
    config.import(require('./section/package'))
    config.import(require('./subscript/package'))
    config.import(require('./superscript/package'))
    config.import(require('./table/package'))
    // config.import(require('./table-wrap/package'))
    config.import(require('./title/package'))

    config.addImporter('jats', JATSImporter)
    config.addExporter('jats', JATSExporter)
  }
}
