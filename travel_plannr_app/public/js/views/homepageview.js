// homepage view hide and cityDetail show cityItinerary show function!!
// you can have one function that encompasses 3 different functions


App.Views.HomePageView = Backbone.View.extend({
  el: '#homepage-view',

	initialize: function() {
		console.log('Home Page View has been created');
		this.homepageTemplate = Handlebars.compile($('#homepage-view-template').html());
		this.render();
	},

	render: function() {
		this.$el.html(this.homepageTemplate());
	},

	// events: {
	// 	'click #search-button': 'hideAndShow'
	// },

	// hideAndShow: function() {
	// 	this.$el.hide();
	// }
});