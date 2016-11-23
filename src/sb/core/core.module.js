import * as angular from 'angular';

import 'angular-ui-router';

import 'angular-material';
import 'angular-animate';
import 'angular-material/angular-material.css';

import 'angular-resizable';
import 'angular-resizable/angular-resizable.min.css';

import 'ace-builds/src-min-noconflict/ace.js';
import 'ace-builds/src-min-noconflict/mode-json.js';
import 'ace-builds/src-min-noconflict/mode-html.js';
import 'angular-ui-ace';

import 'jsonformatter';

import routeConfig from './core.route';

const core = angular.module('sb.core', [
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    'angularResizable',
    'ui.ace',
    'jsonFormatter'
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

function runFunc() {
}

export default core;