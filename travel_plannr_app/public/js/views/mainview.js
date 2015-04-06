// This view is the main view. Clicking on the search button with send
// an ajax request to our server to return the place_id. It will then
// show the detail and itinerary pages and hide the homepage view

App.Views.MainView = Backbone.View.extend({

	// var current = new App.Models.CurrentCity({ url: '../return_place_id'});
	// current.fetch();

	el: '#main-view',

	initialize: function() {
		App.homepage = new App.Views.HomepageView();
	},

	events: {
		'click #search-button': 'executeSearch',
		'click #logo'					: 'showHome',
		'click .user-name'		: 'showIndividualItinerary',
		'click #back'					: 'showCityItinerary'
	},

	showHome: function() { 
		App.cityDetailView.hide();
		App.cityItineraryView.hide();
		App.homepage.show();
	},

  executeSearch: function() {
  		userInput = encodeURI( $('#search-input').val() );

      $.ajax({
          url: '/return_place_id/:' + userInput,
          method: 'GET',
          dataType: 'json'
      }).done(function (placeid) {
          App.currentCity = placeid.place_id;

          App.homepage.hide();

          if (!App.cityDetailView) { App.cityDetailView = new App.Views.CityDetailView(); };

          if (!App.cityItineraryView) { App.cityItineraryView = new App.Views.CityItineraryView(); };
          
          App.cityDetailView.show();
      		App.cityItineraryView.show();

      		});
  },

  showCityItinerary: function () {
  	App.individualItineraryView.hide();
  	App.cityItineraryView.show();
  },

  showIndividualItinerary: function(userClicked) {
  	App.clickedItineraryId = parseInt(userClicked.target.closest('li').dataset.itineraryId);
  	App.clickedItineraryUser = userClicked.target.innerHTML;

  	App.cityItineraryView.hide();

  	if(!App.individualItineraryView) { App.individualItineraryView = new App.Views.IndividualItineraryView(); };
  	
    App.individualItineraryView.getItinerary();
  }

});



















