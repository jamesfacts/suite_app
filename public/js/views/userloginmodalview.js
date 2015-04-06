App.Views.LoginModal = Backbone.View.extend({
	el: '#login-modal'
	
	initialize: function() {
		this.template = Handlebars.compile($('#login-modal-template').html());
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	events {
		'click #sign-up-modal': 'show',
		'click #login-modal': 'show',
		'click #close': 'hide'
	},

	show: function() {
		this.$el.show();
	},

	hide: function() {
		this.$el.hide();
	}
	
});

