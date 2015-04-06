App.Models.CurrentCity = Backbone.Model.extend({
		initialize: function() {
			console.log('A new City Model has been created');
		},

		url: '../return_place_id'
});