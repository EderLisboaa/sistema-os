'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ServiceOrders',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ServiceOrders', // name of Source model
      'user_id' // key we want to remove
    );
    
  }
};
