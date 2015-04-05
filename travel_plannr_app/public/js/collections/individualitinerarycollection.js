App.Collections.IndividualItineraryCollection = Backbone.Collection.extend({

	model: App.Models.Stop,

	initialize: function() {
		this.url = '../itineraries/' + App.clickedItineraryId;
		this.fetch();
	}

});