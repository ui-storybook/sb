import * as angular from 'angular';

import 'angular-ui-router';

import 'angular-material';
import 'angular-animate';
import 'angular-material/angular-material.css';

import 'angular-highlightjs';

import 'angular-resizable';
import 'angular-resizable/angular-resizable.min.css';

import 'ace-builds/src-min-noconflict/ace.js';
import 'ace-builds/src-min-noconflict/mode-json.js';
import 'angular-ui-ace';


import routeConfig from './core.route';

const core = angular.module('asb.core', [
    'ui.router',
    'ngMaterial',
    'hljs',
    'ngAnimate',
    'angularResizable',
    'ui.ace'
]);

core.constant('local', (() => {
    let isLocal = document.location.hostname === 'localhost';
    return isLocal;
})());

// Module run fucntion
core.run(runFunc);

// Router config
core.config(routeConfig);

// Thema config
core.config(($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
        .accentPalette('blue');
});

core.config((hljsServiceProvider) => {
    hljsServiceProvider.setOptions({
        tabReplace: '    '
    });
});

function runFunc() {
}

export default core;