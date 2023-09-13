const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js')


const foros = sequelize.define('foros', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    timestamps: false,
    tableName: 'foros',

});

module.exports = foros



