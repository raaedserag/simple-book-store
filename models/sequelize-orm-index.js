'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const {
  dbHost,
  dbPass,
  dbPort,
  dbUserName,
  dbSchema
} = require("../config.json")
const db = {};

let sequelize = new Sequelize(dbSchema, dbUserName, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  logging: msg => console.log(msg)

});

fs
  .readdirSync(path.join(__dirname, "../models"))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, "../models", file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;