const Author = require("../models/sequelize-orm-index")["Author"]
const Wrote = require("../models/sequelize-orm-index")["Wrote"]

module.exports = {
    insertAuthor: async function (req, res) {
        let result = await Author.create(req.body)
        res.status(200).send(result)
    },

    getAllAuthors: async function (req, res) {
        let result = await Author.findAll({
            where: req.query
        })
        res.status(200).send(result)
    },

    updateAuthor: async function (req, res) {
        let author = await Author.find({
            authorNumber: req.params.number
        })
        if (author) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                author[attr[0]] = attr[1]
            });
            await author.save()

        } else {
            throw new Error("Author not found")
        }
        res.status(200).send(author);
    },

    deleteAuthor: async function (req, res) {
        let author = await Author.find({
            authorNumber: req.params.number
        })
        if (author) await author.destroy();

        res.status(200).send("deleted")
    },

    writeBook: async function (req, res) {
        let result = await Wrote.create(req.body)
        res.status(200).send(result)
    }
}