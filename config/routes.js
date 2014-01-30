'use strict';

module.exports = function(app, passport, auth) {
    
    // User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the baidu oauth routes
    app.get('/auth/baidu', passport.authenticate('baidu', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/baidu/callback', passport.authenticate('baidu', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the weibo oauth routes
    app.get('/auth/weibo', passport.authenticate('weibo', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/weibo/callback', passport.authenticate('weibo', {
        failureRedirect: '/signin'
    }), users.authCallback);


    // Item Routes
    var items = require('../app/controllers/items');
    app.get('/items', items.all);  // list all items
    app.post('/items', auth.requiresLogin, items.create);  // create a new item
    app.get('/items/:itemId', items.show);  // show one item
    app.put('/items/:itemId', auth.requiresLogin, auth.item.hasAuthorization, items.update);  // update one item
    app.del('/items/:itemId', auth.requiresLogin, auth.item.hasAuthorization, items.destroy); // delete one item

    // Finish with setting up the itemId param
    app.param('itemId', items.item);

    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
