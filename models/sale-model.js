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
            foreignKey: 'book_number'
        });
        Sale.belongsTo(models.Customer, {
            foreignKey: 'customer_number'
        });
    };
    return Sale;
};