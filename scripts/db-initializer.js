const Sequelize = require('sequelize');
const models = require('../models/sequelize-orm-index');
const {
    dbHost,
    dbPass,
    dbPort,
    dbUserName,
    dbSchema
} = require("../config.json")
const authorsSamples = require("../samples/authors.json")
const customersSamples = require("../samples/customers.json")
const publishersSamples = require("../samples/publishers.json")

async function Initialize() {
    let tempSequelizeInstance = new Sequelize(null, dbUserName, dbPass, {
        host: dbHost,
        port: dbPort,
        dialect: "mysql"
    })
    await tempSequelizeInstance.query(`CREATE DATABASE IF NOT EXISTS ${dbSchema};`)
    await tempSequelizeInstance.close()

    await models.sequelize.sync({
        force: true
    });

    // Insert samples
    await models.Author.bulkCreate(authorsSamples)
    await models.Customer.bulkCreate(customersSamples)
    await models.Publisher.bulkCreate(publishersSamples)

    process.exit(0)
}

Initialize()