'use strict';

var DocumentNode = require('substance/model/DocumentNode');

/*
  ref

  One item in a bibliographic list.
*/
function Contrib() {
  Contrib.super.apply(this, arguments);
}

DocumentNode.extend(Contrib);

Contrib.type = 'contrib';

/*
  Content
  (label?, (citation-alternatives | element-citation | mixed-citation | nlm-citation | note | x)+)
*/
Contrib.define({
  attributes: { type: 'object', default: {} },
  xmlContent: {type: 'string', default: ''}
});

module.exports = Contrib;
