import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './storybook.component';

let homeModule = angular.module('storybook', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('main.storybook', {
      url: '/?section&story&point&state&device&responsive&split',
      template: '<storybook flex layout="row"></storybook>',
      reloadOnSearch : false
    });
    
})

.component('storybook', homeComponent)

.name;

export default homeModule;
