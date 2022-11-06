/* import Model and DataTypes */
const { Model, DataTypes }  = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
  /* Attributes */
  {
    /* id */
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    /* title */
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [0, 200]
    },
    /* text */
    contents: {
      type: DataTypes.TEXT, // or Sequelize.TEXT?
      allowNull: false,
      len: [0, 1000]
    },
    /* createdBy username */
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    /* createdAt time */
    postedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  /* Options */
  {
    sequelize,
    modelName: 'post',
    freezeTableName: true,
  }
);

module.exports = Post;
