// This view is responsible for rendering the detail info
// on a single city. It gets this info from Google by
// performing a call on our server each time the view is
// needed.

App.Views.CityDetailView = Backbone.View.extend({
	el: '#city-detail-view',

	initialize: function () {
		this.template = Handlebars.compile($('#city-detail-template').html());
	},

	getCityInfo: function () {
		// **** Q here: attributes? ****
		var placeid = this.model.attributes.g_city_id;
		$.ajax({
			url: '/city-info/' + placeid,
			method: 'GET'
		}).done(this.render.bind(this));
	},

	render: function(cityInfo) {
		this.$el.html(this.template(cityInfo));
	},

	show: function () {
		this.$el.show();
		this.model = App.cities.findWhere({g_city_id: App.currentCity});
		this.getCityInfo();
	},

	hide: function () {
		this.$el.hide();
	}
});