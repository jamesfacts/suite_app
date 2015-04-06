App.Views.IndividualItineraryView = Backbone.View.extend({
	el: '#individual-itinerary',

	initialize: function () {
		this.collection = new App.Collections.IndividualItineraryCollection();
		this.template = Handlebars.compile( $('#user-itinerary-template').html() );
		this.listenTo(this.collection, 'sync', this.buildStops);
	},

	getItinerary: function () {
		this.collection.reset();
		this.collection.fetch();
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