import DocumentNode from 'substance/model/DocumentNode'

/*
  ref

  One item in a bibliographic list.
*/
class Contrib extends DocumentNode {}

Contrib.type = 'contrib'

/*
  Content
  (label?, (citation-alternatives | element-citation | mixed-citation | nlm-citation | note | x)+)
*/
Contrib.define({
  attributes: { type: 'object', default: {} },
  xmlContent: {type: 'string', default: ''}
})

export default Contrib
