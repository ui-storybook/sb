import angular from 'angular';
import 'angular-ui-router';
import previewComponent from './preview/preview.component';
import storyListComponent from './storyList/storyList.component';
import templateComponent from './template/template.component';
import modelComponent from './model/model.component'

const module = angular.module('asb.components', ['ui.router',]);

module.component('preview', previewComponent);
module.component('storyList', storyListComponent);
module.component('model', modelComponent);
module.component('view', templateComponent);

export default module;
