import Component from 'substance/ui/Component'
import TextPropertyEditor from 'substance/ui/TextPropertyEditor'
import ContainerEditor from 'substance/ui/ContainerEditor'

class CaptionComponent extends Component {

  render($$) {
    var node = this.props.node
    return (
      <div class="sc-caption" data-id={node.id}>
        {this.renderTitle($$)}
        <div class="se-content">
          <ContainerEditor ref="content"
            disabled={this.props.disabled}
            node={node} />
        </div>
      </div>
    )
  }

  renderTitle($$) {
    var node = this.props.node
    var doc = node.getDocument()
    if (node.title) {
      var title = doc.get(node.title)
      return (
        <TextPropertyEditor ref='title'
          disabled={this.props.disabled}
          path={title.getTextPath()} />
      )
    }
  }
}

export default CaptionComponent
