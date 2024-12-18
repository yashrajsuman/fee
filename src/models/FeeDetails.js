// models/FeeDetails.js

import { DataTypes } from 'sequelize'
import sequelize from '../lib/sequelize'

const FeeDetails = sequelize.define('FeeDetails', {
  usn: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  total_fee: {
    type: DataTypes.INTEGER,
    defaultValue: 80000,  // Set default fee as 80000
  },
  paid_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 20000,  // Set default paid amount as 20000
  },
  remaining_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 60000,  // Default remaining amount calculated
  },
  last_payment_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})

export default FeeDetails
