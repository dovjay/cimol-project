'use strict';
module.exports = (sequelize, DataTypes) => {
  const Washer = sequelize.define('Washer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.BLOB
  }, {
    hooks: {
      beforeSave(washer, options) {
        let testRegex = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
        console.log('==>', testRegex.test(washer.username), washer.username)
        if (testRegex.test(washer.username)) {
          throw new Error('Username must contain letter or number')
        }
      }
    }
  });
  Washer.associate = function(models) {
    Washer.hasMany(models.Transaction)
    // associations can be defined here
  };
  return Washer;
};