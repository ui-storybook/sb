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

let preview = document.createElement('preview-helper');
document.body.appendChild(preview);

angular
    .element(preview)
    .ready(() => {
        angular.bootstrap(preview, ['helper'], { strictDi: false });
    });

export default module;