// This view takes a place ID, and finds the single city that matches that place ID.
// Then, with the city_id of that single city, it builds a collection with many models. 
// These models are each themselves a single itinerary model. These models are 
// rendered as only a name (the name of the user who created them) and an invisible 
// data attribute that contains the itinerary_id.

// This takes place in the main view:

// var id = jimmyfunction(userInput);
// App.homepage.hide()

// App.cityItineraryList = new App.Views.CityItineraryList(id); id is an object
// App.cityDetailView = new App.Views.CityDetailView(id); 


App.Views.CityItineraryList = Backbone.View.extend({

	// main view will pass in a 'place_id'
	el: '#itinerary-list',

	model: App.cities.findWhere( 
 					{g_city_id: App.currentCity}),

	initialize: function(){
		// first, generate a new collection
		this.collection = new App.Collections.CityItineraryCollection();
		this.singleItineraryTemplate = Handlebars.compile( $('#single-itinerary-template').html() );
		this.listenTo(this.collection, 'add', this.render);
	},


	fillItineraries: function() {

		// this is the single city that has the specified place id
		var cityKey = this.model.id;

		// this is an array of itinerary models with the specified city id
		var itinerariesInstance = App.itineraries.where({ city_id: cityKey });

		// reset
		this.collection.reset();

		// iterate over the array of itinerary models, add to our collection
		itinerariesInstance.forEach( function (singleItinerary) {
			App.cityItineraryList.collection.create(singleItinerary)
		});

	},

	render: function(singleItinerary) {
		console.log("City-Itinerary Renderedddd");

		var userId = singleItinerary.attributes.user_id;
		var singleUser = App.users.findWhere({ id: userId });

		var dataToRender = {
			user_name : singleUser.attributes.name,
			itinerary_id : singleItinerary.attributes.id
		};

		debugger;

		// Handlbars template should publically display 'user_name'
		// and set the 'itinerary_id' to a data value	
		this.$el.append(this.singleItineraryTemplate(dataToRender));
	}
});











