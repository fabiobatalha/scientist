import { NodeModel, createValueModel, FlowContentModel, ModelProperty } from '../../kit'

import DispQuoteModel from './DispQuoteModel'

export default class EphigraphModel extends DispQuoteModel {
  // hardcode the attribute content-type="ephigraph"
  constructor (api, node) {
    super(api, node)
    this.attr({'content-type': 'ephigraph'})
    this._attrib = createValueModel(api, 'text', [node.id, 'attrib'])
    this._content = new FlowContentModel(this, node.getContentPath())
  }
}
