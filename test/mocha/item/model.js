'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Item = mongoose.model('Item');

//Globals
var user;
var item;

//The tests
describe('<Unit Test>', function() {
    describe('Model Item:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                item = new Item({
                    title: 'Item Title',
                    description: 'Item Description',
                    seller: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return item.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                item.title = '';

                return item.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Item.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Item.remove().exec();
            User.remove().exec();
            done();
        });
    });
});