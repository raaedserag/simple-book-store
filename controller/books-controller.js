const BooK = require("../models/sequelize-orm-index")["Book"]
const Sale = require("../models/sequelize-orm-index")["Sale"]
const Wrote = require("../models/sequelize-orm-index")["Wrote"]

module.exports = {
    insertBook: async function (req, res) {
        let result = await BooK.create(req.body)
        res.status(200).send(result)
    },

    getAllBooks: async function (req, res) {
        let result = await BooK.findAll({
            where: req.query
        })
        res.status(200).send(result)
    },

    updateBook: async function (req, res) {
        let book = await BooK.findOne({
            where: {
                bookNumber: req.params.number
            }
        })
        if (book) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                book[attr[0]] = attr[1]
            });
            await book.save()

        } else {
            throw new Error("Book not found")
        }
        res.status(200).send(book);
    },

    deleteBook: async function (req, res) {
        let book = await BooK.findOne({
            where: {
                bookNumber: req.params.number
            }
        })
        let sales = await Sale.findOne({
            where: {
                bookNumber: req.params.number
            }
        })
        let wrotes = await Wrote.findOne({
            where: {
                bookNumber: req.params.number
            }
        })
        if (book) {
            await book.destroy();
            await sales.destroy();
            await wrotes.destroy();
        }

        res.status(200).send(book)
    }
}