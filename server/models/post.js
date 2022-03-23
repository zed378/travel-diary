"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      post.hasMany(models.bookmark, {
        as: "mark",
        foreignKey: {
          name: "postId",
        },
      });

      post.hasMany(models.like, {
        as: "like",
        foreignKey: {
          name: "postId",
        },
      });

      post.hasMany(models.comment, {
        as: "comments",
        foreignKey: {
          name: "postId",
        },
      });
    }
  }
  post.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
