App.Views.MainView = Backbone.View.extend({

	// var current = new App.Models.CurrentCity({ url: '../return_place_id'});
	// current.fetch();

	el: '#main-view',

	initialize: function() {
		console.log('Main View has been created');
	},

	showDetailPage: function() {
		if (App.CityDetailView != undefined) {
			$(App.CityDetailView.el).show();
		}
	},

	showItineraryPage: function()	{
		if (App.CityItineraryView != undefined) {
			$(App.CityItineraryView.el).show();
		}
	}

});