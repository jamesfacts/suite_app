// homepage view hide and cityDetail show cityItinerary show function!!
// you can have one function that encompasses 3 different functions


App.Views.HomepageView = Backbone.View.extend({
  el: '#homepage-view',

	initialize: function() {
		this.homepageTemplate = Handlebars.compile($('#homepage-view-template').html());
		this.render();
	},

	render: function() {
		this.$el.html(this.homepageTemplate());
	},

	hide: function() {
		this.$el.hide();
	},

	show: function() {
		this.$el.show();
	}
});