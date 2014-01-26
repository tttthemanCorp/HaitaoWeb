'use strict';

angular.module('mean.items').controller('ItemsController', ['$scope', '$routeParams', '$location', 'Global', 'Items', function ($scope, $routeParams, $location, Global, Items) {
    $scope.global = Global;

    $scope.create = function() {
        var item = new Items({
            title: this.title,
            description: this.description,
            brand: this.brand,
            price: this.price,
            pictures: this.pictures
        });
        item.$save(function(response) {
            $location.path('items/' + response._id);
        });

        this.title = '';
        this.content = '';
        this.brand = '';
        this.price = '';
        this.pictures = '';
    };

    $scope.remove = function(item) {
        if (item) {
            item.$remove();

            for (var i in $scope.items) {
                if ($scope.items[i] === item) {
                    $scope.items.splice(i, 1);
                }
            }
        }
        else {
            $scope.item.$remove();
            $location.path('items');
        }
    };

    $scope.update = function() {
        var item = $scope.item;
        if (!item.updated) {
            item.updated = [];
        }
        item.updated.push(new Date().getTime());

        item.$update(function() {
            $location.path('items/' + item._id);
        });
    };

    $scope.find = function() {
        Items.query(function(items) {
            $scope.items = items;
        });
    };

    $scope.findOne = function() {
        Items.get({
            itemId: $routeParams.itemId
        }, function(item) {
            $scope.item = item;
        });
    };
}]);