const { like } = require("../../models");

exports.setLike = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const checkLike = await like.findOne({ where: { userId, postId } });

    if (checkLike) {
      if (checkLike.isLike === 0) {
        await like.update({ isLike: 1 }, { where: { userId, postId } });

        res.send({
          status: "Success",
          message: "Sucess Like",
        });
      } else {
        await like.update({ isLike: 0 }, { where: { userId, postId } });

        res.send({
          status: "Success",
          message: "Sucess unLike",
        });
      }
    } else {
      await like.create({ userId, postId, isLike: 1 });

      res.send({
        status: "Success",
        message: "Sucess Add Like",
      });
    }
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getLike = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await like.findOne({
      where: {
        userId: req.user.id,
        postId: id,
      },

      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getAllLike = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await like.findAll({
      where: { postId: id, isLike: 1 },

      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      data,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
