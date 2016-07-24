import Annotation from 'substance/model/Annotation'

class Bold extends Annotation {}

Bold.define({
  type: 'bold',
  attributes: { type: 'object', default: {} },
})

export default Bold
