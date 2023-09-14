//Importamos los modulos a utilizar 
const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.js');


//Definimos atributos y restricciones de nuestra tabla
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
  //Nombre de la tabla y desactivamos la creación automatica de 'timestamps'
    timestamps: false,
    tableName: 'foros',

});


//Exportamos el modelo 'foros' para utilizarlo en otros archivos
module.exports = foros



