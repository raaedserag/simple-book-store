'use strict';
module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define('Customer', {
    customerNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    timestamps: false
  });
  Customer.associate = function (models) {};
  return Customer;
};