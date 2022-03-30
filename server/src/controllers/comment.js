const { comment, user } = require("../../models");

exports.addComment = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const input = {
      userId: userId,
      postId: postId,
      comment: req.body.comment,
    };

    await comment.create(input);

    res.send({
      status: "Success",
      message: "Add Comment Success",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getAllComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const data = await comment.findAll({
      where: { postId },

      include: [
        {
          model: user,
          as: "user",

          attributes: {
            exclude: ["email", "password", "phone", "createdAt", "updatedAt"],
          },
        },
      ],

      order: [["id", "DESC"]],

      attributes: {
        exclude: ["userId", "postId", "updatedAt"],
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

exports.setMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const getStatus = await comment.findOne({
      where: { id },
    });

    if (getStatus.menuClick === 0) {
      await comment.update(
        { menuClick: 1 },
        {
          where: { id },
        }
      );

      res.send({
        status: "Success Show Comment Menu",
      });
    } else {
      await comment.update(
        { menuClick: 0 },
        {
          where: { id },
        }
      );

      res.send({
        status: "Success UnShow Comment Menu",
      });
    }
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.editsComment = async (req, res) => {
  try {
    const { id, content } = req.params;

    await comment.update({ comment: content }, { where: { id } });

    res.send({
      status: "Success Update Comment",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.delComment = async (req, res) => {
  try {
    const { id } = req.params;

    await comment.destroy({ where: { id } });

    res.send({
      status: "Success Delete Comment",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
