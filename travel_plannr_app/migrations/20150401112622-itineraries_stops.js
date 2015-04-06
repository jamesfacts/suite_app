"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
	  migration.createTable("itineraries_stops", {
	  	itinerary_id: {
	  		type: DataTypes.INTEGER
	  	},
	  	stop_id: {
	  		type: DataTypes.INTEGER
	  	}
	  }).done(done);
  },

  down: function(migration, DataTypes, done) {
  migration.dropTable("itineraries_stops").done(done);
  }
};
