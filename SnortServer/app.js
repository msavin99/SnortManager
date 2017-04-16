// app.js ( the base server )


//SETUP EXPRESS
//======================================================================

//Get the necessary packages
var express 	= require('express');
var app			= express();			// define our app that's using express
var bodyParser  = require('body-parser');
var router      = require('./routes');
// configure the app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 	//set the port


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// REGISTER OUR routes
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE server
// =======================================================================
app.listen(port);
console.log('Started server on port '+ port);
