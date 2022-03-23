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
            exclude: [
              "id",
              "email",
              "password",
              "phone",
              "createdAt",
              "updatedAt",
            ],
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
