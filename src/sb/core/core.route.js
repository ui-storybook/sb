export default function routerConfiguration($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
    "ngInject";

    $httpProvider.defaults.cache = true;
    $stateProvider
        .state('main', {
            abstract: true,
            views: {
                '': {
                    template: `<ui-view layout="column" flex></ui-view>`
                }
            }
        })

    $urlRouterProvider.otherwise('/');
}