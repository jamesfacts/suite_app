App.Views.EditItineraryView = Backbone.View.extend({
	el: '#edit-itinerary',

	initialize: function () {
		this.collection = App.individualItineraryView.collection;
		this.template = Handlebars.compile( $('#edit-itinerary-template').html() );
		// this.listenTo(this.collection, 'add', this.addStop);
		// this.listenTo(this.collection, 'remove', this.deleteStop)
	},

	events: {
		'click .stop'		:   'toggleStop'
	},

	toggleStop: function () {

	},

	save: function () {
		//iterate through collection and put it to the server

	},

	buildPotentialStops: function () {

	},

	buildExistingStops: function () {
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