'use strict';
module.exports = (sequelize, DataTypes) => {
    let Sale = sequelize.define('Sale', {
        date: DataTypes.DATE,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER
    }, {
        timestamps: false
    });
    Sale.associate = function (models) {
        Sale.belongsTo(models.Book, {
            foreignKey: 'bookNumber',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        Sale.belongsTo(models.Customer, {
            foreignKey: 'customerNumber',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };
    return Sale;
};