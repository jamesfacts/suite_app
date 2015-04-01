"use strict";
module.exports = function(sequelize, DataTypes) {
  var stops = sequelize.define("stops", {
    name: DataTypes.STRING,
    place_id: DataTypes.STRING,
    city_id: DataTypes.INTEGER
  }, {

    timestamps: false,

    classMethods: {
      associate: function(models) {
        stops.belongsToMany(models.itineraries, {
          through: 'itineraries_stops',
          foreignKey: 'stop_id'
        });
        stops.belongsTo(models.cities, {
          foreignKey: 'city_id'
        });
      }
    }
  });
  return stops;
};