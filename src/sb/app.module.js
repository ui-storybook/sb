import * as angular from 'angular';

import 'mousetrap';

import core from './core/core.module';
import services from './services/services.module';
import modules from './modules/modules.module';
import components from './components/components.module';
import directives from './directives/directives.module';

angular.module('sb', [
    'sb.core',
    'sb.modules',
    'sb.directives',
    'sb.directives',
    'sb.services',
    'sb.components'
]);
