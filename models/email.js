'use strict';
const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

class Email extends Model {};

Email.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  sent: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db, 
  modelName: 'Email',
  tableName: 'emails',
  freezeTableName: true,
  timestamps: false
});

module.exports = Email;