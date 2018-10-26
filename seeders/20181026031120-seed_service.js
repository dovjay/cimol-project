'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Services', [{
     name: 'Full Body Wash',
     cost: 50000,
     estimate: 30,
     createdAt: new Date(),
     updatedAt: new Date()
   },{
    name: 'Interior Wash',
    cost: 100000,
    estimate: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Coating mirror',
    cost: 20000,
    estimate: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Tire shining',
    cost: 30000,
    estimate: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Services', null, {})
  }
};
