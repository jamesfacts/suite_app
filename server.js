var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    models           = require('./models'),
    request          = require('request'),
    GooglePlaces		 = require('googleplaces');

var GOOGLE_PLACES_API_KEY = "AIzaSyDTdWH_EerYdX8b0lI15YmQFAjEzthwEX4";
var GOOGLE_PLACES_OUTPUT_FORMAT = "json";

var googlePlaces = new GooglePlaces(GOOGLE_PLACES_API_KEY, 
																		GOOGLE_PLACES_OUTPUT_FORMAT);

var User 						 = models.users;
var Itinerary				 = models.itineraries;
var City 						 = models.cities;
var Stop						 = models.stops;

var app = express();

// Server Configuration
app.use(logger('dev'));
app.use( bodyParser() );
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Export app as module

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
			res.send(itineraryStops.stops);
		});
});

//create
app.post('/itineraries', function(req, res) {
	var data = req.body;
	//var cityId = req.body.city_id;

	Itinerary
		.create(data)
		.then(function(newItinerary){
			console.log(newItinerary);
			res.send(newItinerary);
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
app.post('/itineraries/:id', function(req, res) {
	var itineraryId = req.params.id;
	var stopData = req.body;

//	res.send(req.body);

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
app.delete('/itineraries/:itinerary_id/:stop_id', function(req, res) {
	Stop
		.findOne(req.params.stop_id)
		.then(function(stop) {
			stop
				.destroy()
				.then(function(destroyedStop){
					res.send(destroyedStop);
				});
		});
});



// ================= Google API  =================

// Get ALL city details
app.get('/city-info/:placeid', function (req, res) {

	var idParameters = { placeid: req.params.placeid };

	var data = {};
	data.attractions = [];

	googlePlaces.placeDetailsRequest(idParameters, function (error, response) {
	  if (error) throw error;

	  data.name = response.result.formatted_address;
	  data.location = { location: [response.result.geometry.location.lat,
	  						                 response.result.geometry.location.lng] };

	  googlePlaces.placeSearch(data.location, function (error, response) {
		  if (error) throw error;

		  response.results.forEach(function (result) {
			  												var attraction = {
			  													name: result.name,
			  													g_place_id: result.place_id,
			  													type: result.types[0],
			  													location: result.geometry
			  												};

			  												data.attractions.push(attraction);
		  												});
		  res.send(data);
		})
	 
		});

});

// get request to google places API for place_id
app.get('/return_place_id/:place_text', function(req, res) {

	var placeIdRoot = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
	var cityName = encodeURI(req.params.place_text);
	var apiKey = '&key=' + GOOGLE_PLACES_API_KEY;

	var queryUrl = placeIdRoot + cityName + apiKey;
		request.get(queryUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(response.body);
				res.send({place_id: data.results[0].place_id});
			}
		});
});


// get ONLY attractions

app.get('/city-stops/:place_id', function (req, res) {

	var idParameters = { placeid: req.params.place_id };

	var attractions = [];

	googlePlaces.placeDetailsRequest(idParameters, function (error, response) {
	  if (error) throw error;

	  var location = { location: [response.result.geometry.location.lat,
	  						                 response.result.geometry.location.lng] };

	  googlePlaces.placeSearch(location, function (error, response) {
		  if (error) throw error;

		  response.results.forEach(function (result) {
			  												var attraction = {
			  													name: result.name,
			  													g_place_id: result.place_id
			  												};

			  												attractions.push(attraction);
		  												});
		  res.send(attractions);
		})
	 
		});

});







