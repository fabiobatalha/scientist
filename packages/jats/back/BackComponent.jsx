import Component from 'substance/ui/Component'
import ContainerEditor from 'substance/ui/ContainerEditor'

class BackComponent extends Component {

  render($$) {
    var node = this.props.node
    var configurator = this.props.configurator
    return (
      <div class="sc-back" data-id={node.id} ref="back">
        <ContainerEditor disabled={this.props.disabled}
          node={node} commands={configurator.getSurfaceCommandNames()}
          textTypes={configurator.getTextTypes()} />
      </div>
    )
  }
}

export default BackComponent
