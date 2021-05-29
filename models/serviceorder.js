'use strict';
module.exports = (sequelize, DataTypes) => {

  const ServiceOrder = sequelize.define('ServiceOrder', {
    product: DataTypes.STRING,
    soluction: DataTypes.STRING,
    repair_date: DataTypes.STRING
  }, {});

  ServiceOrder.associate = function(models) {
    // ServiceOrder.belongsTo(models.user)
  };
  
  return ServiceOrder;
};