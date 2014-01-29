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
        clientID: "bcJhzkSHxRY92VBULBL0fQ",
        clientSecret: "dpDsxupJaZhUWdy5HYOAi0NBed52auyEp6eI35We1U",
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
    },
    baidu: {
        clientID: "SL9TzzUuiw0oEELSnRkiWzVb",
        clientSecret: "XaUnsoZ9KpGCPbeSPqeKt1pvBy3keKA0",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/baidu/callback"
    },
    weibo: {
        clientID: "2892308481",
        clientSecret: "2ae1caf815bb98196314f5473cb63b08",
        callbackURL: "http://haitaoweb.herokuapp.com/auth/weibo/callback"
    }
}