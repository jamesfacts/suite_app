// This view is responsible for rendering the detail info
// on a single city. It gets this info from Google by
// performing a call on our server each time the view is
// needed.

App.Views.CityDetail = Backbone.View.extend({
	el: '#city-detail-view',

	model: App.cities.findWhere( 
 					{g_city_id: App.currentCity}),

	initialize: function () {
		this.template = Handlebars.compile($())
		this.render();
	},

	render: function () {

	},

	show: function () {

	},

	hide: function () {

	}


});