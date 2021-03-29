'use strict';
module.exports = (sequelize, DataTypes) => {
  let Author = sequelize.define('Author', {
    authorNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    authorName: DataTypes.STRING,
    yearBorn: DataTypes.STRING,
    yearDied: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  }, {
    timestamps: false
  });
  Author.associate = function (models) {};
  return Author;
};