import template from './pluginBox.html';
import controller from './pluginBox.controller';
import './pluginBox.less';

let pluginBoxComponent = {
  bindings: {
    open: '='
  },
  controllerAs: 'vm',
  template,
  controller
};

export default pluginBoxComponent;
