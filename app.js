var express = require('express')
    , app = express() // Web framework to handle routing requests
    , cons = require('consolidate') // Templating library adapter for Express
    , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
    , routes = require('./routes') // Routes for our application
    , cookieParser = require('cookie-parser') //cookie parsing with signatures
    , bodyParser = require('body-parser');

MongoClient.connect('mongodb://localhost:27017/myblog', function (err, db) {
    "use strict";
    if (err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.use(cookieParser());

    // parse application/json
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Application routes
    routes(app, db);

    app.listen(8082);
    console.log('Express server listening on port 8082');
});
