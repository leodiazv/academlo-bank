const { db } = require('../utils/database');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 6,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
      isAlphanumeric: true,
    },
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
});

module.exports = { User };
