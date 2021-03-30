'use strict';
module.exports = (sequelize, DataTypes) => {
    let Wrote = sequelize.define('Wrote', {}, {
        timestamps: false
    });
    Wrote.associate = function (models) {
        Wrote.belongsTo(models.Book, {
            foreignKey: 'bookNumber',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        Wrote.belongsTo(models.Author, {
            foreignKey: 'authorNumber',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };
    return Wrote;
};