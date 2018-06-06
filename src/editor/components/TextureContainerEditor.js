import { ContainerEditor, IsolatedNodeComponent } from 'substance'

/*
  Customized ContainerEditor that produces a fall-back display
  for nodes which are not supported yet.
*/
export default class TextureContainerEditor extends ContainerEditor {

  _renderNode($$, node) {
    let api = this.context.api
    let disabled = this.props.disabled
    if (!node) throw new Error("'node' is mandatory")

    let props = { node, disabled }
    let type = node.type
    let model
    if (api) {
      model = api.getModel(node)
    } else {
      console.warn('this.context.api not found.')
    }
    
    // NOTE: It would be better to change the `node` property to `model` so we see the different semantics.
    // However this may break too many things at once and requires two different implementations of ContainerEditor
    // which is why we push this for a bit.
    if (model) {
      props = { node: model.getNode(), model, disabled }
      type = model.type
    } else {
      console.warn(`No model available for ${type}, using node directly...`)
    }

    let el
    let ComponentClass = this.getComponent(type, true)

    if (node.isText()) {
      if (ComponentClass) {
        el = $$(ComponentClass, props)
      } else {
        el = $$(this.getComponent('text-node'), props)
      }
    } else {
      if (ComponentClass) {
        // HACK: if model is present we use the component directly, as IsolatedNodeComponent is not yet prepared to
        // forward the model property
        if (ComponentClass.prototype._isCustomNodeComponent || ComponentClass.prototype._isIsolatedNodeComponent || model) {
          el = $$(ComponentClass, props)
        } else {
          el = $$(IsolatedNodeComponent, props)
        }
      } else {
        el = $$(this.getComponent('unsupported'), props)
      }
    }
    el.ref(node.id)
    return el
  }

}
