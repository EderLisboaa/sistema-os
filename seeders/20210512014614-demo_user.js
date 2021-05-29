'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
      await queryInterface.bulkInsert('Users', [{
        name: 'Eder',
        email: 'ederrdlls@hotmail.com',
        password: '123',
        role: 'Técnico',
        created_at: new Date,
        updated_at: new Date,
      }]);
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
