// homepage view hide and cityDetail show cityItinerary show function!!
// you can have one function that encompasses 3 different functions


App.Views.HomepageView = Backbone.View.extend({
  el: '#homepage-view',

	initialize: function() {
		this.homepageTemplate = Handlebars.compile($('#homepage-view-template').html());
		this.randomLocation();
	},

	randomLocation: function () {

		var numUpToOneHundo = function() {
    return (Math.random() * 100) 
		}

		var posOrNeg = function() {
		    if (Math.random() > .5)
		        {return -1}
		    else
		        {return 1}
		};

		var lat = Math.floor((numUpToOneHundo() * posOrNeg()));
		var lng = Math.floor((numUpToOneHundo() * posOrNeg()));

		var coordinates = {lat: lat,
											 lng: lng};

		this.render(coordinates);
	},

	render: function(coordinates) {

		this.$el.html(this.homepageTemplate(coordinates));
	},

	hide: function() {
		this.$el.hide();
	},

	show: function() {
		this.randomLocation();
		this.$el.show();
	}
});



















































