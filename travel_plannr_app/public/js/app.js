var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	console.log('Loaded, bro.');

	App.cities = new App.Collections.CitiesCollection();
  App.itineraries = new App.Collections.ItinerariesCollection();
  App.users = new App.Collections.UsersCollection();
  App.homepage = new App.Views.HomepageView();
  App.citydetail = new App.Views.CityDetail(); //friday afternoon
  App.cityitinerary = new App.Views.CityItineraryList(); //friday afternoon

  // Async issue

 	// App.cityItineraryList = new 
 	// 	App.Views.CityItineraryList( 
 	// 		{ model: 
 	// 			App.cities.findWhere( 
 	// 				{g_city_id: 'ChIJ674hC6Y_WBQRujtC6Jay33k'})  
 	// 	});

 	// App.cityItineraryList.fillItineraries();

});