'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.items'],
	function($interpolateProvider) {
    	$interpolateProvider.startSymbol('[[');
    	$interpolateProvider.endSymbol(']]');
});

angular.module('mean.system', []);
angular.module('mean.items', []);