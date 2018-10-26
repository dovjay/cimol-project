'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.BLOB
  }, {
    hooks: {
      beforeSave(user, options) {
        let testRegex = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
        console.log('==>', testRegex.test(user.username), user.username)
        if (testRegex.test(user.username)) {
          throw new Error('Username must contain letter or number')
        }
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Service, {through: models.Transaction})

    // associations can be defined here
  };
  return User;
};