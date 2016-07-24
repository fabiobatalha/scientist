import Back from './Back'
import BackConverter from './BackConverter'
import BackComponent from './BackComponent'

export default {
  name: 'back',
  configure: function(config) {
    config.addNode(Back);
    config.addComponent(Back.type, BackComponent);
    config.addConverter('jats', BackConverter);
  }
};
