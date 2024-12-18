// lib/sequelize.js

import { Sequelize } from 'sequelize'

// Set up Sequelize with MySQL
const sequelize = new Sequelize(
  process.env.DB_DATABASE,   // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST,  // Host (e.g., 'localhost')
    dialect: 'mysql',           // Dialect for MySQL
    logging: false,             // Disable SQL query logging (optional)
  }
)

export default sequelize
