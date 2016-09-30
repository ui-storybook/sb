import * as angular from 'angular';

import core from './core/core.module';
import services from './services/services.module';
import modules from './modules/modules.module';
import components from './components/components.module';
import directives from './directives/directives.module';

angular.module('asb', [
    'asb.core',
    'asb.modules',
    'asb.directives',
    'asb.components',
    'asb.directives',
    'asb.services'
]);
