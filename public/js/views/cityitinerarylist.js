// This view takes a place ID, and finds the single city that matches that place ID.
// Then, with the city_id of that single city, it builds a collection with many models. 
// These models are each themselves a single itinerary model. These models are 
// rendered as only a name (the name of the user who created them) and an invisible 
// data attribute that contains the itinerary_id.

App.Views.CityItineraryView = Backbone.View.extend({

	el: '#city-itinerary-list',

	initialize: function(){
		this.collection = new App.Collections.CityItineraryCollection();

		this.template = Handlebars.compile( $('#city-itinerary-template').html() );
		this.listenTo(this.collection, 'reset', this.render);

	},

	getCity: function () {

		if (!App.cities.findWhere({g_city_id: App.currentCity})) 
			{ 
				this.addCity() 
			}
		else
			{ 
				var cityKey = App.cities.findWhere({g_city_id: App.currentCity});
				cityKey = cityKey.id;
				this.getItineraries(cityKey);
			}
	},

	addCity: function () {

		$.ajax({
			url: '/city-name/' + App.currentCity,
			method: 'GET',
		}).done(function(cityName) {
			App.cities.create({
				name: cityName,
				g_city_id: App.currentCity
			}, { success: function() {
										App.currentCityId = App.cities.last().id
										} });
		});

		this.getItineraries(App.currentCityId);
	},

	getItineraries: function (cityKey) {
		// this is an array of itinerary models with the specified city id
		var itineraries = App.itineraries.where({ city_id: cityKey});

		this.getUsers(itineraries);
	},

	getUsers: function (itineraries) {

		var itineraryItems = [];

		itineraries.forEach( function(singleItinerary) {
			var userId = singleItinerary.attributes.user_id;
			var singleUser = App.users.findWhere({ id: userId });

			var dataToRender = {
				user_name : singleUser.attributes.name,
				itinerary_id : singleItinerary.attributes.id
			}
			itineraryItems.push(dataToRender);
		});

		this.collection.reset(itineraryItems);
	},

	render: function() {
		var renderData = {itinerary: this.collection.models};
		this.$el.html(this.template( renderData ));
	},

	show: function() {
		this.getCity();
		this.$el.show();
	},

	hide: function() {
		this.$el.hide();
	}
});











