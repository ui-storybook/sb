import angular from 'angular';

import storybook from './storybook/storybook';

let module = angular.module('asb.modules', [
    storybook
]).name;

export default module;