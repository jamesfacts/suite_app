// This view is the main view. Clicking on the search button with send
// an ajax request to our server to return the place_id. It will then
// show the detail and itinerary pages and hide the homepage view

App.Views.MainView = Backbone.View.extend({

	// var current = new App.Models.CurrentCity({ url: '../return_place_id'});
	// current.fetch();

	el: '#main-view',

	initialize: function() {
		console.log('Main View has been created');
		this.home = new App.homepage(); //friday afternoon
		this.detailView = new App.citydetail(); //friday afternoon
		this.cityItinerary = new App.cityitinerary(); //friday afternoon
	},

	render: function() { //friday afternoon
		this.$el.empty();
		this.$el.append(this.home.$el);
		this.home.render();
	},

	events: {
		'click #search-button': 'executeSearch',
	},

  executeSearch: function() {
  		userInput = encodeURI( $('#search-input').val() );

      $.ajax({
          url: '/return_place_id/:' + userInput,
          method: 'GET',
          dataType: 'json'
      }).done(function(placeid) {
          App.currentCity = placeid;
          App.homepage.hide();

          App.detail = new App.CityDetailView(); // should show detail
          App.itinerariesInCity = new App.CityItineraryView(); // should show itinerary
      		
      		App.detail.show()
      		App.itinerariesInCity.show()
      		});
  }

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