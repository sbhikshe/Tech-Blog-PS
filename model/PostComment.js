/* import Model and DataTypes */
const { Model, DataTypes }  = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');

class PostComment extends Model {};

PostComment.init(
  /* Attributes */
  {
    /* id */
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    /* comment text */
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [0, 1000]
    },
    parentPost: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
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
    modelName: 'postComment',
    freezeTableName: true,
  }
);

module.exports = PostComment;
