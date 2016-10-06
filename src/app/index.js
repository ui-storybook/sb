import angular from 'angular';
import './style.less'
import helper from '../helpers/angular/helper'
import components from './components/components';

angular.module('sb.stories', [helper, components]);

let preview = document.createElement('preview-helper');
document.body.appendChild(preview);

angular.element(preview)
	.ready(() => {
		angular.bootstrap(preview, ['sb.stories'], { strictDi: false });
	});