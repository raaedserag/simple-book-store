const Sale = require("../models/sequelize-orm-index")["Sale"]
const Customer = require("../models/sequelize-orm-index")["Customer"]
const Book = require("../models/sequelize-orm-index")["Book"]

module.exports = {
    insertSale: async function (req, res) {
        let result = await Sale.create(req.body)
        res.status(200).send(result)
    },

    getAllSales: async function (req, res) {
        let result = await Sale.findAll({
            where: req.query,
            include: [{
                model: Customer,
                attributes: ['name']
            },{
                model: Book,
                attributes: ['bookName']
            }]
        })

        // Format result style
        if(result.length){
            result = result.map((sale)=>{
                sale = JSON.parse(JSON.stringify(sale))
                sale.customerName = sale.Customer.name
                sale.bookName = sale.Book.bookName
                delete sale.Customer
                delete sale.Book
                return sale
            })
        }
        res.status(200).send(result)
    },

    updateSale: async function (req, res) {
        let sale = await Sale.findOne({
            where: {
                id: req.params.id
            }
        })
        if (sale) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                sale[attr[0]] = attr[1]
            });
            await sale.save()

        } else {
            throw new Error("Sale not found")
        }
        res.status(200).send(sale);
    },

    deleteSale: async function (req, res) {
        let sale = await Sale.findOne({
            where: {
                id: req.params.id
            }
        })
        if (sale) await sale.destroy();

        res.status(200).send(sale)
    }
}