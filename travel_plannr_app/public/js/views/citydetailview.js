// This view is responsible for rendering the detail info
// on a single city. It gets this info from Google by
// performing a call on our server each time the view is
// needed.

App.Views.CityDetail = Backbone.View.extend({
	el: '#city-detail',

	place_id: 'ChIJ674hC6Y_WBQRujtC6Jay33k',

	// model: App.cityDetail,

	initialize: function () {
		// will need to set a template eventually
		this.listenTo(this.model, 'change', this.render);
	},

	setDetails: function () {
		this.model = new App.cityDetail({ place_id: this.place_id });

	},

	render: function () {

	}


});