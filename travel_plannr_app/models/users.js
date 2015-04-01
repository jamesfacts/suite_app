"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: DataTypes.STRING,
    pin: DataTypes.INTEGER
  }, {

    timestamps: false,
    
    classMethods: {
      associate: function(models) {
      users.hasMany(models.itineraries, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        hooks: true
      });
      }
    }
  });
  return users;
};