"use strict";
module.exports = function(sequelize, DataTypes) {
  var cities = sequelize.define("cities", {
    name: DataTypes.STRING,
    g_city_id: DataTypes.STRING
  }, {

    timestamps: false, 

    classMethods: {
      associate: function(models) {
        cities.hasMany(models.stops, { 
          foreignKey: 'city_id' 
        });
        cities.hasMany(models.itineraries, { 
          foreignKey: 'city_id' 
        });
      }
    }
  });
  return cities;
};