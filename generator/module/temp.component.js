import template from './<%= name %>.html';
import controller from './<%= name %>.controller';
import './<%= name %>.less';

let <%= name %>Component = {
  bindings: {},
  controllerAs: 'vm',
  template,
  controller
};

export default <%= name %>Component;
