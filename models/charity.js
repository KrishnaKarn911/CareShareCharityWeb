const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Charity = sequelize.define('Charity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Charity;
