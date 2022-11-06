/* import Model and DataTypes */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init(
  /* Attributes */
  {
    /* id is primary key and auto incremented */
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    /* username should be unique */
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    /* password should be atleast 8 characters */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[8]
    },
  },
  /* Options */
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
  }
);

module.exports = User;