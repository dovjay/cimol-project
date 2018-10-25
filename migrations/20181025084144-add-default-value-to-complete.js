'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn('Transactions', 'complete', { type: Sequelize.INTEGER, defaultValue: 0 })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn('Transactions', 'complete', { type: Sequelize.INTEGER })
  }
};
