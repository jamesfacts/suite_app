App.Collections.ItinerariesCollection = Backbone.Collection.extend({
	
	model: App.Models.Itinerary,

	url: '../itineraries',

	initialize: function() {
		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});

	},

	fetchSuccess: function(collection, response) {
		console.log('Itineraries Collection Fetch Success', response);
		console.log('Itineraries Collection Models', collection.models);
	},

	fetchError: function(collection, response) {
		throw new Error("Itineraries fetch error");
	}
});