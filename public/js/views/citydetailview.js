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
		var placeid = App.currentCity;
		$.ajax({
			url: '/city-info/' + placeid,
			method: 'GET'
		}).done(this.render.bind(this));

		// var cityInfo = {
		// 	name: 'Cairo',
		// 	attractions: [{"name":"Garden City","g_place_id":"ChIJ0VVEW8xAWBQR70829-J2gVo"},{"name":"Cairo Down Town Hotel","g_place_id":"ChIJKQZbycdAWBQRedCIX1upFOQ"},{"name":"Shepheard Hotel","g_place_id":"ChIJ5SCs5s5AWBQRKelDmZoPr5k"},{"name":"Egyptian Museum of Antiquities","g_place_id":"ChIJDSAkL8RAWBQR447lPPV4wRE"},{"name":"House of Representatives","g_place_id":"ChIJxaCk6s5AWBQRerjiKJMYN4Q"},{"name":"League of Arab States","g_place_id":"ChIJYx73WM9AWBQRM8tcaBM5-Bs"},{"name":"Semiramis InterContinental Hotel Cairo","g_place_id":"ChIJUbshEc9AWBQRDih1RZkmI5c"},{"name":"Costa Coffee","g_place_id":"ChIJzbIR-8dAWBQRt4irZNA4plg"},{"name":"Egyptian Night Hotel","g_place_id":"ChIJKSbylsZAWBQR8ssXHLhSxmM"},{"name":"McDonald's","g_place_id":"ChIJcyOeoGJAWBQR1NHDupAYms4"},{"name":"King tut hostel","g_place_id":"ChIJP5ULocBAWBQR1SvOdvdsMQ0"},{"name":"American University","g_place_id":"ChIJX2B-j8hAWBQRcsdouRBPwHk"},{"name":"Hardee's","g_place_id":"ChIJ84ZTFcZAWBQRk8ifiUZzoCE"},{"name":"Automobile & Touring Club Of Egypt","g_place_id":"ChIJ4eUvUL9AWBQRVuCEU9SJ-kw"},{"name":"El Tahrir Flags Establishment","g_place_id":"ChIJ84ZTFcZAWBQRyWIgTxuyfRA"},{"name":"Cilantro","g_place_id":"ChIJd-i4FY9AWBQRuLl04FLesW8"},{"name":"Museum View Hotel","g_place_id":"ChIJ620pj8ZAWBQRC39RMmdFa7M"},{"name":"Cairo City Center Hotel","g_place_id":"ChIJkQSPxcZAWBQRjQmCwJboV0I"},{"name":"Dahab Hostel","g_place_id":"ChIJS0fxLsdAWBQRnWvabtNHNlk"},{"name":"Cairo","g_place_id":"ChIJ674hC6Y_WBQRujtC6Jay33k"}]
		// };

		// this.render(cityInfo)
	},

	render: function(cityInfo) {
		this.$el.html(this.template(cityInfo));
	},

	show: function () {
		this.$el.show();
		this.getCityInfo();
	},

	hide: function () {
		this.$el.hide();
	}
});