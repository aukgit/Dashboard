// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./package.json');
var ports = config.port;


// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || ports.api; // set our port





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
    res.send('im the home page!');
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/:name')

    // create a bear (accessed at POST http://localhost:8080/bears)
    .post(function (req, res) {
        res.send("bears");
        console.log(req);
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        res.send("bears");
        console.log(req);
    });

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
