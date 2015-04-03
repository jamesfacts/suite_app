App.Views.MainView = Backbone.View.extend({

	// var current = new App.Models.CurrentCity({ url: '../return_place_id'});
	// current.fetch();

	el: '#main-view',

	initialize: function() {
		console.log('Main View has been created');
	},

	events: {
		'click #search-button': 'hideAndShowView',
	},

	hideAndShowView: function() {
		$.ajax({
			url: '/return_place_id/:place_text',
			method: 'GET',
			dataType: 'json'
		}).done(function(placeid) {
			App.currentCity = placeid;

			App.detail = new App.CityDetailView(); // should show detail
			App.itinerariesInCity = new App.CityItineraryView(); // should show itinerary
		  
		  var homepage = new App.Views.HomePageView;

		});
	},

});