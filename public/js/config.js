'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/items', {
            templateUrl: 'views/items/list.html'
        }).
        when('/items/create', {
            templateUrl: 'views/items/create.html'
        }).
        when('/items/:itemId/edit', {
            templateUrl: 'views/items/edit.html'
        }).
        when('/items/:itemId', {
            templateUrl: 'views/items/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);