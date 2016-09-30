import template from './template.partial.html';
import controller from './template.controller';
import './template.less';

let templateComponent = {
  bindings: {},
  controllerAs: 'vm',
  template,
  controller
};

export default templateComponent;
