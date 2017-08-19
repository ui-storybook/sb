import angular from 'angular';
import 'angular-ui-router';

import previewComponent from './preview/preview.component';
import storyListComponent from './storyList/storyList.component';
import templateComponent from './template/template.component';
import modelComponent from './model/model.component'
import interceptorComponent from './interceptor/interceptor.component'
import markdownComponent from './markdown/markdown.component'

const module = angular.module('sb.components', ['ui.router',]);

module.component('preview', previewComponent);
module.component('storyList', storyListComponent);
module.component('model', modelComponent);
module.component('view', templateComponent);
module.component('interceptor', interceptorComponent);
module.component('markdown', markdownComponent);

module.run(storeService => {

    const tabs = [
        {
            title: 'preview',
            template: '<preview flex layout="column"></preview>'
        },
        {
            title: 'model',
            template: '<model flex layout="column"></model>'
        },
        {
            title: 'view',
            template: '<view flex layout="column"></view>'
        },
        {
            title: 'XHR',
            template: '<interceptor flex layout="column"></interceptor>'
        },
        {
            title: 'Docs',
            template: '<markdown flex layout="column"></markdown>'
        }
    ];

    // Register tabs
    tabs.forEach(tab => storeService.component(tab));

});

export default module;
