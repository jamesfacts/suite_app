"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("stops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      place_id: {
        type: DataTypes.STRING
      },
      city_id: {
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("stops").done(done);
  }
};