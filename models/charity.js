const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
  email:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100] // password length between 6 and 100 characters
        }
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL,
        validate: {
            isEqual(value) {
                if (value !== this.password) {
                    throw new Error('Passwords do not match');
                }
            }
        }
    },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image:{
    type: DataTypes.STRING,
    defaultValue: '/images/preview.jpg'
  }
}, {
    hooks: {
        beforeSave: async (user) => {
          try {
            if (user.changed('password')) { 
              console.log('Before save hook: hashing password');
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
              console.log('Password hashed');
              user.confirmPassword = undefined;
            }
          } catch (err) {
            console.error('Error in beforeSave hook:', err);
            throw err; 
          }
        }
    }
});

module.exports = Charity;
