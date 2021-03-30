const Customer = require("../models/sequelize-orm-index")["Customer"]
const Sale = require("../models/sequelize-orm-index")["Sale"]

module.exports = {
    insertCustomer: async function (req, res) {
        let result = await Customer.create(req.body)
        res.status(200).send(result)
    },

    getAllCustomers: async function (req, res) {
        let result = await Customer.findAll({
            where: req.query
        })
        res.status(200).send(result)
    },

    updateCustomer: async function (req, res) {
        let customer = await Customer.findOne({
            where: {
                customerNumber: req.params.number
            }
        })
        if (customer) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                customer[attr[0]] = attr[1]
            });
            await customer.save()

        } else {
            throw new Error("Customer not found")
        }
        res.status(200).send(customer);
    },

    deleteCustomer: async function (req, res) {
        let customer = await Customer.findOne({
            where: {
                customerNumber: req.params.number
            }
        })

        let sales = await Sale.findOne({
            where: {
                customerNumber: req.params.number
            }
        })
        if (customer) {
            await customer.destroy();
            await sales.destroy();
        }

        res.status(200).send(customer)
    }
}