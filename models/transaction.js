'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    WasherId: DataTypes.INTEGER,
    ServiceId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    complete: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Washer)
    // associations can be defined here
  };
  return Transaction;
};