App.Collections.CitiesCollection = Backbone.Collection.extend({
	
	model: App.Models.City,
	url: '../cities',

	initialize: function() {
		console.log('A Cities Collection has been created');

		this.fetch({
			success: this.fetchSuccess,
			//error: this.fetchError
		});
	},

	fetchSuccess: function(collection, response) {
		console.log('Cities Collection Fetch Success', response);
		console.log('Cities Collection Models', collection.models);
	}

	// fetchError: function(collection, response) {
	// 	throw new Error('Cities fetch error');
	// }
});