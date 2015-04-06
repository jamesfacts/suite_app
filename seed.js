var models = require('./models');

var User = models.users;
var Itinerary = models.itineraries;
var City = models.cities;
var Stop = models.stops;

var userNames = ['Shomit', 'Jimmy', 'James', 
								 'McK', 'Hari', 'Will', 'Tony'];
var userPins = [1234];

var cityNames = ['Cairo', 'Marrakesh', 'Windhoek'];

var cityGId = ['ChIJ674hC6Y_WBQRujtC6Jay33k','ChIJUZ4Xlo3urw0RuK2HT1O2UFk',
					 'ChIJ7QEMs1wbCxwRO11EzEBJuOQ'];

var cairoStopNames = ['Tahrir Square', 'Automobile & Touring Club Of Egypt', 
								 'Cafe Corniche', ];

var cairoStopGId = ['ChIJ9bu2PMZAWBQRifEJLHOddes', 'ChIJ4eUvUL9AWBQRVuCEU9SJ-kw', 
							 'ChIJUbshEc9AWBQRkc5DRbxN374'];

var marrakeshStopNames = ['Jardin Majorelle', 'Mosquée Azli', 'Palais de la Bahia'];

var marrakeshStopGId = ['ChIJj7dmi4furw0RHPHQzsn2zIg', 'ChIJn092Izbprw0RPmjSYhKbPU8', 
												'ChIJq0vBckfurw0R23-BRUdfmII'];

var windhoekStopNames = ['Heinitzburg', 'Sam Nujoma Stadium', 'Ramatex Garment Factory'];

var windhoekStopGId = ['ChIJYVYh2TYbCxwRWi-kz0FbrJc', 'ChIJlTtQpfAcCxwRN8VdBovtVew', 
											 'ChIJ76ZTQw0cCxwRMW9Mo_1vpE0'];


// =============== Create Users =================

var buildUsers = function () {

	var shomit = User.create({
		name: userNames[0],
		pin: userPins[0]
	});

	var jimmy = User.create({
		name: userNames[1],
		pin: userPins[0]
	});

	var james = User.create({
		name: userNames[2],
		pin: userPins[0]
	});

	var mck = User.create({
		name: userNames[3],
		pin: userPins[0]
	});

	var hari = User.create({
		name: userNames[4],
		pin: userPins[0]
	});

	var will = User.create({
		name: userNames[5],
		pin: userPins[0]
	});

	var tony = User.create({
		name: userNames[6],
		pin: userPins[0]
	});
}

buildUsers();

// ================ Create Cities ===============

var cairo = City.create({
	name: cityNames[0],
	g_city_id: cityGId[0]
}).then(function (savedCairo) {
	console.log("Cairo is: " + savedCairo.id);
	// add the stops available in Cairo 
	for (var i = 0; i < cairoStopNames.length; i++) {
		Stop.create({
			name: cairoStopNames[i],
			g_stop_id: cairoStopGId[i],
			city_id: savedCairo.id
		});
	};		 
	})
	// construct some itineraries
	.then(function () {		
		var tripOne = Itinerary.create({
			user_id: 1,
			city_id: 1
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(1)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});

			Stop
				.findOne(2)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
			
		var tripTwo = Itinerary.create({
			user_id: 2,
			city_id: 1
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(3)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
});

var marrakesh = City.create({
	name: cityNames[1],
	g_city_id: cityGId[1]
}).then(function (savedMarrakesh) {
	console.log("Marrakesh is: " + savedMarrakesh.id);
	// add the stops available in Marrakesh 
	for (var i = 0; i < marrakeshStopNames.length; i++) {
		Stop.create({
			name: marrakeshStopNames[i],
			g_stop_id: marrakeshStopGId[i],
			city_id: savedMarrakesh.id
		});
	};		 
	})
	// construct some itineraries
	.then(function () {		
		var tripOne = Itinerary.create({
			user_id: 4,
			city_id: 2
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(6)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});

			Stop
				.findOne(4)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
			
		var tripTwo = Itinerary.create({
			user_id: 5,
			city_id: 2
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(5)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
});

var windhoek = City.create({
	name: cityNames[2],
	g_city_id: cityGId[2]
}).then(function (savedWindhoek) {
	console.log("Windhoek is: " + savedWindhoek.id);
	// add the stops available in Windhoek 
	for (var i = 0; i < windhoekStopNames.length; i++) {
		Stop.create({
			name: windhoekStopNames[i],
			g_stop_id: windhoekStopGId[i],
			city_id: savedWindhoek.id
		});
	};		 
	})
	// construct some itineraries
	.then(function () {		
		var tripOne = Itinerary.create({
			user_id: 3,
			city_id: 3
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(8)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});

			Stop
				.findOne(7)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
			
		var tripTwo = Itinerary.create({
			user_id: 6,
			city_id: 3
		}).then(function (itineraryToAddStopsTo) {
			Stop
				.findOne(9)
				.then(function (stopToAdd) {
					itineraryToAddStopsTo.addStop(stopToAdd);
				});
			});
	});











