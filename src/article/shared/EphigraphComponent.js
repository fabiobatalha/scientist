import { Component } from 'substance'

export default class EphigraphComponent extends Component {
  render ($$) {
    let model = this.props.model
    const contentValueModel = model.getPropertyValue('content')
    const attribValueModel = model.getPropertyValue('attrib')
    const ContentEditor = this.getComponent(contentValueModel.type)
    const AttribEditor = this.getComponent(attribValueModel.type)

    let el = $$('div')
      .addClass('sc-ephigraph')
      .attr('data-id', model.id)

    el.attr('content-type', 'ephigraph')

    el.append(
      $$(ContentEditor, {
        model: contentValueModel,
        placeholder: 'Enter text'
      })
    )

    el.append(
      $$(AttribEditor, {
        model: attribValueModel,
        placeholder: 'Enter attribution'
      })
    )
    return el
  }
}
