const Wrote = require("../models/sequelize-orm-index")["Wrote"]
const Author = require("../models/sequelize-orm-index")["Author"]
const Book = require("../models/sequelize-orm-index")["Book"]

module.exports = {
    insertWrote: async function (req, res) {
        let result = await Wrote.create(req.body)
        res.status(200).send(result)
    },

    getAllWrotes: async function (req, res) {
        let result = await Wrote.findAll({
            where: req.query,
            include: [{
                model: Author,
                attributes: ['authorName']
            },{
                model: Book,
                attributes: ['bookName']
            }]
        })
        // Format result style
        if(result.length){
            result = result.map((wrote)=>{
                wrote = JSON.parse(JSON.stringify(wrote))
                wrote.authorName = wrote.Author.authorName
                wrote.bookName = wrote.Book.bookName
                delete wrote.Author
                delete wrote.Book
                return wrote
            })
        }
        res.status(200).send(result)
    },

    updateWrote: async function (req, res) {
        let wrote = await Wrote.findOne({
            where: {
                id: req.params.id
            }
        })
        if (wrote) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                wrote[attr[0]] = attr[1]
            });
            await wrote.save()

        } else {
            throw new Error("Wrote not found")
        }
        res.status(200).send(wrote);
    },

    deleteWrote: async function (req, res) {
        let wrote = await Wrote.findOne({
            where: {
                id: req.params.id
            }
        })
        if (wrote) await wrote.destroy();

        res.status(200).send(wrote)
    }
}