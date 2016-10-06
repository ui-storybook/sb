import 'angular-sanitize';
import controller from './helper.controller';
import compile from './helper.compile';
let module = angular.module('helper', ['ngSanitize']);

module.directive('compile', compile);

module.component('previewHelper', {
    controller,
    template: `<div compile="vm.template"></div>`,
    controllerAs: 'vm'
});

export default module.name;