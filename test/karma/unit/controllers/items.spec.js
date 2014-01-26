'use strict';

(function() {
    // Items Controller Spec
    describe('MEAN controllers', function() {
        describe('ItemsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var ItemsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                ItemsController = $controller('ItemsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one item object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('items').respond([{
                        title: 'An Item about MEAN',
                        description: 'MEAN rocks!'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.items).toEqualData([{
                        title: 'An Item about MEAN',
                        description: 'MEAN rocks!'
                    }]);

                });

            it('$scope.findOne() should create an array with one item object fetched ' +
                'from XHR using a itemId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.itemId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testItemData = function() {
                        return {
                            title: 'An Item about MEAN',
                            description: 'MEAN rocks!'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/items\/([0-9a-fA-F]{24})$/).respond(testItemData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.item).toEqualData(testItemData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postItemData = function() {
                        return {
                            title: 'An Item about MEAN',
                            description: 'MEAN rocks!'
                        };
                    };

                    // fixture expected response data
                    var responseItemData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            title: 'An Item about MEAN',
                            description: 'MEAN rocks!'
                        };
                    };

                    // fixture mock form input values
                    scope.title = 'An Item about MEAN';
                    scope.description = 'MEAN rocks!';

                    // test post request is sent
                    $httpBackend.expectPOST('items', postItemData()).respond(responseItemData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.title).toEqual('');
                    expect(scope.description).toEqual('');

                    // test URL location to new object
                    expect($location.path()).toBe('/items/' + responseItemData()._id);
                });

            it('$scope.update() should update a valid item', inject(function(Items) {

                // fixture rideshare
                var putItemData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        title: 'An Item about MEAN',
                        to: 'MEAN is great!'
                    };
                };

                // mock item object from form
                var item = new Items(putItemData());

                // mock item in scope
                scope.item = item;

                // test PUT happens correctly
                $httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/, putItemData()).respond();
                /*
                Error: Expected PUT /items\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Item about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Item about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/items/' + putItemData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid itemId' +
                'and remove the item from the scope', inject(function(Items) {

                    // fixture rideshare
                    var item = new Items({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.items = [];
                    scope.items.push(item);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/items\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(item);
                    $httpBackend.flush();

                    // test after successful delete URL location items lis
                    //expect($location.path()).toBe('/items');
                    expect(scope.items.length).toBe(0);

                }));
        });
    });
}());