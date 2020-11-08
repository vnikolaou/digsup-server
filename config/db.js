'use strict';

const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './digsup.sqlite3'
});

module.exports = db;
