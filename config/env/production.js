'use strict';

module.exports = {
    db: "mongodb://admin:mypwd@troup.mongohq.com:10085/haitao",
    app: {
        name: "海淘会"
    },
    facebook: {
        clientID: "651112554926626",
        clientSecret: "4f9aa64e5f15d6c2b46bd844fef99d2a",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/google/callback"
    }
}