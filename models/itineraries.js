"use strict";
module.exports = function(sequelize, DataTypes) {
  var itineraries = sequelize.define("itineraries", {
    user_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER
  }, {

    timestamps: false,

    classMethods: {
      associate: function(models) {
       itineraries.belongsTo(models.users, {
        foreignKey: 'user_id'
      }); 
       itineraries.belongsTo(models.cities, {
        foreignKey: 'city_id'
       });
       itineraries.belongsToMany(models.stops, { 
        through: 'itineraries_stops',
        foreignKey: 'itinerary_id' 
      });
      }
    }
  });
  return itineraries;
};