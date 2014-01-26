'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': '商品列表',
        'link': 'items'
    }, {
        'title': '创建新商品',
        'link': 'items/create'
    }];
    
    $scope.isCollapsed = false;
}]);