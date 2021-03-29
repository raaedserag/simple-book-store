'use strict';
module.exports = (sequelize, DataTypes) => {
    let Wrote = sequelize.define('Wrote', {}, {
        timestamps: false
    });
    Wrote.associate = function (models) {
        Wrote.belongsTo(models.Book, {
            foreignKey: 'book_number'
        });
        Wrote.belongsTo(models.Author, {
            foreignKey: 'author_number'
        });
    };
    return Wrote;
};