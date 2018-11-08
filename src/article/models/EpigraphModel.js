import { NodeModel, createValueModel, FlowContentModel, ModelProperty } from '../../kit'

import DispQuoteModel from './DispQuoteModel'

export default class EpigraphModel extends DispQuoteModel {
  // hardcode the attribute content-type="epigraph"
  constructor (api, node) {
    super(api, node)
    this.attr({'content-type': 'epigraph'})
    this._attrib = createValueModel(api, 'text', [node.id, 'attrib'])
    this._content = new FlowContentModel(this, node.getContentPath())
  }
}
