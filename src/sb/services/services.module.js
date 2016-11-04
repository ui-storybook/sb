import angular from 'angular';
import storeService from './store.service';

const module = angular.module('sb.services', []);

module.service('storeService', storeService);

export default module;