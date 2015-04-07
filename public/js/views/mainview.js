// This view is the main view. Clicking on the search button with send
// an ajax request to our server to return the place_id. It will then
// show the detail and itinerary pages and hide the homepage view

App.Views.MainView = Backbone.View.extend({

	// var current = new App.Models.CurrentCity({ url: '../return_place_id'});
	// current.fetch();

	el: '#main-view',

	initialize: function() {
		App.homepage = new App.Views.HomepageView();
    //hacky fix below
    App.clickedItineraryId = 0;
	},

	events: {
		'click #search-button': 'executeSearch',
		'click #logo'					: 'showHome',
		'click .user-name'		: 'showIndividualItinerary',
		'click #back'					: 'showCityItinerary',
    'click #edit'         : 'showEditItinerary',
    'click #save'         : 'executeSave',
    'click #add-new-itinerary' : 'showAddItinerary',
    'click #return'       :  'returnFromAdd'
	},

	showHome: function() { 
		if (App.cityDetailView) {App.cityDetailView.hide();};
		if (App.cityItineraryView) {App.cityItineraryView.hide();};
    if (App.individualItineraryView) {App.individualItineraryView.hide();};
    if (App.editItineraryView) {App.editItineraryView.hide();};
		App.homepage.show();
	},

  executeSearch: function() {
  		userInput = encodeURI( $('#search-input').val() );
      this.listenTo(App.users, 'add', this.newUserItinerary);

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
  },

  showEditItinerary: function() {
    
    // clickedItineraryId = App.users.last().id

    if(App.individualItineraryView) { App.individualItineraryView.hide(); };
    if(App.addItineraryView) {App.addItineraryView.hide();};

    if(!App.editItineraryView) { App.editItineraryView = new App.Views.EditItineraryView(); };

    App.editItineraryView.retrieveAllStops();
  },

  executeSave: function() {
    App.editItineraryView.save();
    App.editItineraryView.hide();

    App.individualItineraryView.show();
     
  },

  showAddItinerary: function() {
    App.cityItineraryView.hide();

    if (!App.addItineraryView) {App.addItineraryView = new App.Views.AddItineraryView();};

    App.addItineraryView.show();
  },

  returnFromAdd: function() {
    App.addItineraryView.hide();
    App.cityItineraryView.show();
  },

  newUserItinerary: function() {
    var newUserId = App.users.last().id;
    //console.log("the current user ID is ", newUserId);
    debugger;
    var cityId = App.currentCityId;
    //console.log("the current city ID is ", cityId);

    data = {user_id: newUserId, city_id: cityId};

    App.itineraries.create(data, { success: function() {

      App.clickedItineraryId = App.itineraries.last().id;
      App.individualItineraryView.getItinerary();
      App.mainView.showEditItinerary();
    }});
  }

});



















