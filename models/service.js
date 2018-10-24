'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    estimate: DataTypes.INTEGER
  }, {});
  Service.associate = function(models) {
    models.Service.belongsToMany(models.User, {through: models.Transaction})
    // associations can be defined here
  };
  return Service;
};