'use strict';
module.exports = (sequelize, DataTypes) => {
  let Publisher = sequelize.define('Publisher', {
    publisherName: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    president: DataTypes.STRING,
    yearFounded: DataTypes.STRING
  }, {
    timestamps: false
  });

  Publisher.associate = function (models) {};
  return Publisher;
};