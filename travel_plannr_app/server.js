var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    models           = require('./models');

var app = express();

// Server Configuration
app.use(logger('dev'));
app.use( bodyParser() );
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Routes

// Export app as module

var application_root 	= __dirname;
var express 			= require('express');
var logger 				= require('morgan');
var bodyParser			= require('body-parser');
var models 				= require('./models');

var User 				= models.users;
var Itinerary			= models.itineraries;
var City 				= models.cities;
var Stop				= models.stops;

var app = express();

app.use(logger('dev'));
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

module.exports = app;


//---------endpoints for USERS----------

//index
app.get('/users', function(req, res) {
	User
		.findAll()
		.then(function(users) {
			res.send(users);
		});
});

//show
app.get('/users/:id', function(req, res) {
	User
		.findOne({
			where: { id: req.params.id },
			include: [Itinerary]
		})
		.then(function(userItineraries) {
			res.send(userItineraries);
		});
});

//create
app.post('/users', function(req, res) {
	User
		.create(req.body)
		.then(function(newUser){
			res.send(newUser);
		});
});

//update
app.put('/users/:id', function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(users){
			users
				.update(req.body)
				.then(function(updatedUser){
					res.send(updatedUser);
				});
		});
});

//delete
app.delete('/users/:id', function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user){
			user
				.destroy()
				.then(function(destroyedUser){
					res.send(destroyedUser);
				});
		});
});


//---------endpoints for ITINERARIES----------

//index
app.get('/itineraries', function(req, res) {
	Itinerary
		.findAll()
		.then(function(itineraries){
			res.send(itineraries);
		});
});

//show
app.get('/itineraries/:id', function(req, res) {
	Itinerary
		.findOne({
			where: { id: req.params.id }, 
			include: [Stop]
		})
		.then(function(itineraryStops) {
			res.send(itineraryStops);
		});
});

//create
app.post('/users/:id/itineraries', function(req, res) {
	var userId = req.params.id;
	var itineraryData = req.body;
	User
		.findOne(userId)
		.then(function(user){
			Itinerary
				.create(itineraryData)
				.then(function(newItinerary){
					user.addItinerary(newItinerary);
					res.send(newItinerary);
				});
		});
});

//delete
app.delete('/itineraries/:id', function(req, res) {
	Itinerary
		.findOne(req.params.id)
		.then(function(itinerary) {
			itinerary
				.destroy()
				.then(function(destroyedItinerary){
					res.send(destroyedItinerary);
				});
		});
});


//---------endpoints for CITIES----------


//index
app.get('/cities', function(req, res) {
	City
		.findAll()
		.then(function(cities) {
			res.send(cities);
		});
});

//show
app.get('/cities/:id', function(req, res) {
	City
		.findOne(req.params.id)
		.then(function(city) {
			res.send(city);
		});
});

//create
app.post('/cities', function(req, res) {
	City
		.create(req.body)
		.then(function(newCity) {
			res.send(newCity);
		});
});

//update
app.put('/cities/:id', function(req, res) {
	City
		.findOne(req.params.id)
		.then(function(city){
			city
				.update(req.body)
				.then(function(updatedCity) {
					res.send(updatedCity);
				});
		});
});

//delete
app.delete('/cities/:id', function(req, res) {
	City
		.findOne(req.params.id)
		.then(function(city) {
			city
				.destroy()
				.then(function(destroyedCity) {
					res.send(destroyedCity);
				});
		});
});



//---------endpoints for STOPS----------

//index
app.get('/stops', function(req, res) {
	Stop
		.findAll()
		.then(function(stops){
			res.send(stops);
		});
});

//create
app.post('/itineraries/:id/stops', function(req, res) {
	var itineraryId = req.params.id;
	var stopData = req.body;

	Itinerary
		.findOne(itineraryId)
		.then(function(itinerary) {
			Stop
				.create(stopData)
				.then(function(newStop){
					itinerary.addStop(newStop)
						res.send(newStop);
				});
		});
});

//update
app.put('/stops/:id', function(req, res) {
	Stop
		.findOne(req.params.id)
		.then(function(stop) {
			stop
				.update(req.body)
				.then(function(updatedStop) {
					res.send(updatedStop);
				});
		});
});

//delete
app.delete('/stops/:id', function(req, res) {
	Stop
		.findOne(req.params.id)
		.then(function(stop) {
			stop
				.destroy()
				.then(function(destroyedStop){
					res.send(destroyedStop);
				});
		});
});