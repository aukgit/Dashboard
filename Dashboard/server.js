// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./package.json');
var ports = config.port;
var apiPort = ports.api;
var url = config.env.urls[config.env.current] + ":" + apiPort;
var request = require('request');


var getOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};

var postOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};



// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || apiPort; // set our port





// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.send('Hello from API!');
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/:name')

    // create a bear (accessed at POST http://localhost:8080/bears)
    .post(function (req, res) {
        callfunction(req, res, postOptions);

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        callfunction(req, res, getOptions);
        //res.send("bears" + JSON.stringify(getResponseFromFile(req.params.name)));
    });

router.route('/:name/:p1/:p2/:p3')

    // create a bear (accessed at POST http://localhost:8080/bears)
    .post(function (req, res) {
        callfunction(req, res, postOptions);

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        callfunction(req, res, getOptions);
        //res.send("bears" + JSON.stringify(getResponseFromFile(req.params.name)));
    });


var getResponseFromFile = function (name) {
    if (name) {
        return require("./app/" + name + ".js");
    }
}

var callfunction = function (req, res, options) {
    var name = req.params.name;
    console.log(name);
    if (name) {
        var fileJs = getResponseFromFile(name);
        request(options, function () {
            res.send(JSON.stringify(fileJs[name].apply(this, [app, router, config, options, req, req.params])));
        });
    }
}

router.route('/example')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        console.log("example loaded in get mode.");
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================



app.listen(port);

console.log('Magic happens on port ' + port);
