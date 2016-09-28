import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= name %>Component from './<%= name %>.component';

let <%= name %>Module = angular.module('<%= name %>', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.<%= name %>', {
      url: '/',
      component: '<%= name %>'
    });
})

.component('<%= name %>', <%= name %>Component)

.name;

export default <%= name %>Module;
