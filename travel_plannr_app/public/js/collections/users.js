App.Collections.UsersCollection = Backbone.Collection.extend({

	model: App.Models.User,
	url: '../users', 

	initialize: function() {
		console.log('A Users Collection has been created');

		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		});
	},

	fetchSuccess: function(collection, response) {
		console.log('Users Collection Fetch Success', response);
		console.log('Users Collection Models', collection.models);
	},

	fetchError: function(collection, response) {
		throw new Error('Users fetch error');
	}
});