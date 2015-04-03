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
			App.detail = new App.CityDetailView(placeid); // should show detail
			App.itinerary = new App.CityItineraryView(placeid); // should show itinerary
		  var homepage = new App.Views.HomePageView;
				homepage.hide(placeid);
		});
	},

	// showDetailPage: function() {
	// 	if (App.Views.CityDetailView != undefined) {
	// 		$(App.Views.CityDetailView.el).show();
	// 	}
	// },

	// showItineraryPage: function()	{
	// 	if (App.Views.CityItineraryView != undefined) {
	// 		$(App.Views.CityItineraryView.el).show();
	// 	}
	// }

});