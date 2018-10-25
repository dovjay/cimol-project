'use strict';
module.exports = (sequelize, DataTypes) => {
  const Washer = sequelize.define('Washer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  Washer.associate = function(models) {
    Washer.hasMany(models.Transaction)
    // associations can be defined here
  };
  return Washer;
};