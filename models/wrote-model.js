'use strict';
module.exports = (sequelize, DataTypes) => {
    let Wrote = sequelize.define('Wrote', {}, {
        timestamps: false
    });
    Wrote.associate = function (models) {
        Wrote.belongsTo(models.Book, {
            foreignKey: 'bookNumber'
        });
        Wrote.belongsTo(models.Author, {
            foreignKey: 'authorNumber'
        });
    };
    return Wrote;
};