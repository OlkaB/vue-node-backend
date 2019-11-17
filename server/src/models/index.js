const fs = require('fs')
const Sequelize = require('sequelize')
const config = require('../config/config')

const db = {}
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

const modules = [
    require('./User'),
    require('./Posts'),
]

  modules.forEach((module) => {
    const model = module(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db