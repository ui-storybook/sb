import angular from 'angular';

import './styles/app.less'

import './app.module';

let element = document.getElementById('asb__main');

angular
    .element(element)
    .ready(() => {
        angular.bootstrap(element, ['asb'], { strictDi: false });
    });