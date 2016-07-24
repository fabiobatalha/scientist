import Bold from './Bold'
import BoldConverter from './BoldConverter'
import AnnotationTool from 'substance/ui/AnnotationTool'
import AnnotationCommand from 'substance/ui/AnnotationCommand'

export default {
  name: 'bold',
  configure: function(config) {
    config.addNode(Bold)
    config.addConverter('jats', BoldConverter)
    config.addCommand(Bold.type, AnnotationCommand, { nodeType: Bold.type })
    config.addTool(Bold.type, AnnotationTool)
    config.addIcon(Bold.type, { 'fontawesome': 'fa-bold' })
    config.addStyle(__dirname, '_bold.scss')
    config.addLabel(Bold.type, {
      en: 'Bold'
    })
  }
}
