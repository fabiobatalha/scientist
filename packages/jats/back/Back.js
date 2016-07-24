import Container from 'substance/model/Container'

/*
  Back matter

  Material published with an article but following the narrative flow.
*/
class Back extends Container {}

/*
  Attributes
    id Document Internal Identifier
    xml:base Base

  Content
    (label?, title*, (ack | app-group | bio | fn-group | glossary | ref-list | notes | sec)*)
*/

Back.type = 'back'

Back.define({
  attributes: { type: 'object', default: {} },
  label: { type: 'label', optional:true },
  titles: { type: ['title'], default: [] },
  nodes: { type: ['id'], default: [] },
})

export default Back
