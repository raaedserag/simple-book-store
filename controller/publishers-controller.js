const Publisher = require("../models/sequelize-orm-index")["Publisher"]

module.exports = {
    insertPublisher: async function (req, res) {
        let result = await Publisher.create(req.body)
        res.status(200).send(result)
    },

    getAllPublishers: async function (req, res) {
        let result = await Publisher.findAll({
            where: req.query
        })
        res.status(200).send(result)
    },

    updatePublisher: async function (req, res) {
        let publisher = await Publisher.findOne({
            where: {
                publisherName: req.params.name
            }
        })
        if (publisher) {
            // Update passed attributes only (from req.body)
            Object.entries(req.body).forEach(attr => {
                publisher[attr[0]] = attr[1]
            });
            await publisher.save()

        } else {
            throw new Error("Publisher not found")
        }
        res.status(200).send(publisher);
    },

    deletePublisher: async function (req, res) {
        let publisher = await Publisher.findOne({
            where: {
                publisherName: req.params.name
            }
        })
        if (publisher) await publisher.destroy();

        res.status(200).send("deleted")
    },


}