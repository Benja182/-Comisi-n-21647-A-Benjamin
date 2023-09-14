// Carga las variables de entorno desde el archivo .env
require('dotenv').config();


//Importamos los modulos a utilizar 
const { Sequelize } = require('sequelize'); 
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });


//Definimos constantes con los datos requeridos de nuestra base de datos
const dbName = process.env.DB_NAME;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;


const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    host: 'localhost',  
    dialect: 'mysql',
});


//Función para comprobar la conexión con nuestra base de datos
const dbTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


//Exportamos la instancia de 'sequelize' y la función 'dbTest'
module.exports = { sequelize, dbTest };