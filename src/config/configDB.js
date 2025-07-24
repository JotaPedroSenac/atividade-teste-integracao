const { Sequelize } = require('sequelize');
require('dotenv').config();

// console.log('DATABASE:', process.env.DB_DATABASE);
// console.log('USER:', process.env.DB_USER);
// console.log('PASSWORD:', process.env.DB_PASSWORD);
// console.log('PASSWORD IS STRING:', typeof process.env.DB_PASSWORD);
// console.log('HOST:', process.env.DB_HOST);
// console.log('PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: true, // opcional
    }
);

module.exports = { sequelize };