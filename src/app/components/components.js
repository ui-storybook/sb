import angular from 'angular';
const module = angular.module('components', []);

module.component('test', {
    controller: function($http) {
        $http.get('https://randomuser.me/api/');
    },
    template: `<div>{{$ctrl.text}}</div>`,
    bindings: {
        text: '@'
    }
});

export default module.name;
