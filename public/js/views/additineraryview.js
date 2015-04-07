App.Views.AddItineraryView = Backbone.View.extend({
	el: '#add-itinerary',

	initialize: function() {
		this.template = Handlebars.compile($('#add-itinerary-template').html());
		this.show();
	},

	events: {
		'click #add-user'			:  'addUser'
	},

	addUser: function () {
		var userInputName = this.$el.find('input').val();
		App.clickedItineraryUser = userInputName;

		App.users.create({ name: userInputName, pin: 1234 }, 
										 { wait: true });

	},

	render: function() {
		this.$el.html(this.template());
	},

	show: function() {
		this.render();
		this.$el.find('input').val('');
		this.$el.show();
	},

	hide: function() {
		this.$el.hide();
	}
});