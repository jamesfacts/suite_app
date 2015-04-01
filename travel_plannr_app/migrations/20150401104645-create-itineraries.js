"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("itineraries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      city_id: {
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("itineraries").done(done);
  }
};