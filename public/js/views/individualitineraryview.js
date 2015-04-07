App.Views.IndividualItineraryView = Backbone.View.extend({
	el: '#individual-itinerary',

	initialize: function () {
		console.log("I EXIST NOW!!!!!!!! AND MY NUMBER IS", App.clickedItineraryId);

		if (App.Collections.stopsByUser) {
			this.collection = App.Collections.stopsByUser
		} else {
			App.Collections.stopsByUser = new App.Collections.IndividualItineraryCollection();
			this.collection = App.Collections.stopsByUser
			};

		//this.collection = new App.Collections.IndividualItineraryCollection();
		this.template = Handlebars.compile( $('#user-itinerary-template').html() );
		this.listenTo(this.collection, 'sync', this.buildStops);
	},

	getItinerary: function () {
		if (App.clickedItineraryId != 0) {
			this.collection.url = '../itineraries/' + App.clickedItineraryId;
			this.collection.fetch();
		}
	},

	buildStops: function () {
		var renderData = {
			userName: App.clickedItineraryUser,
			itineraryId: App.clickedItineraryId,
			stop: []
		};

		this.collection.forEach(function(singleStop) {

			var stopData = { 
				name: singleStop.attributes.name,
				g_stop_id: singleStop.attributes.g_stop_id
			};
			renderData.stop.push(stopData);
		});

		this.render(renderData);
	},

	render: function (renderData) {
		this.$el.html( this.template(renderData)  );
		
		this.show();
	},

	show: function() {
		this.$el.show();
	},

	hide: function() {
		this.$el.hide();
	}

});