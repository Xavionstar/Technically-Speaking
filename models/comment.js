const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//the comment model with all the info requirements that will dynamically populate the database
class Comment extends Model {}

Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          contents: {
            type: DataTypes.STRING,
            allowNull: false,
          },
         user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          blogpost_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment',
      },
);

module.exports = Comment;