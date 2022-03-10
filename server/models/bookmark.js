"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookmark.belongsTo(models.user, {
        as: "bookmark",
        foreignKey: "userId",
      });

      bookmark.belongsTo(models.post, {
        as: "mark",
        foreignKey: {
          name: "postId",
        },
      });
    }
  }
  bookmark.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      isMark: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bookmark",
    }
  );
  return bookmark;
};
