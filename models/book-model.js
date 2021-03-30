'use strict';
module.exports = (sequelize, DataTypes) => {
  let Book = sequelize.define('Book', {
    bookNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookName: DataTypes.STRING,
    publicationYear: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Book.associate = function (models) {
    Book.belongsTo(models.Publisher, {
      foreignKey: 'publisherName',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  };
  return Book;
};