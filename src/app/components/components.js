import angular from 'angular';
const module = angular.module('components', []);

module.component('test', {
	controller: function () {
	},
	template: `<div>{{$ctrl.text}}</div>`,
	bindings: {
		text: '@'
	}
});

export default module.name;
