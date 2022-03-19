"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      like.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      like.belongsTo(models.post, {
        as: "post",
        foreignKey: {
          name: "postId",
        },
      });
    }
  }
  like.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      isLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "like",
    }
  );
  return like;
};
