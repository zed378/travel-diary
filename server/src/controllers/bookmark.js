// import model
const { bookmark, post, user } = require("../../models");

exports.setMark = async (req, res) => {
  try {
    const { postId } = req.params;

    const dataExist = await bookmark.findOne({
      where: {
        userId: req.user.id,
        postId,
      },
    });

    if (dataExist) {
      if (dataExist.isMark === 1) {
        await bookmark.update(
          { isMark: 0 },
          { where: { userId: req.user.id, postId } }
        );
      } else {
        await bookmark.update(
          { isMark: 1 },
          { where: { userId: req.user.id, postId } }
        );
      }

      res.send({
        status: "Success",
        message: "Success update mark diary",
      });
    } else {
      await bookmark.create({
        userId: req.user.id,
        postId,
        isMark: 1,
      });

      res.send({
        status: "Success",
        message: "Success bookmarked diary",
      });
    }
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getAllMark = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await bookmark.findAll({
      where: { userId: id, isMark: 1 },

      include: [
        {
          model: post,
          as: "post",
          include: [
            {
              model: user,
              as: "user",
              attributes: {
                exclude: [
                  "id",
                  "email",
                  "password",
                  "photo",
                  "phone",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
          attributes: { exclude: ["userId", "updatedAt"] },
        },
      ],

      attributes: {
        exclude: ["userId", "postId", "isMark", "updatedAt", "createdAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        thumbnail: process.env.POST_PATH + item.post.thumbnail,
      };
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

exports.getMark = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const data = await bookmark.findOne({
      where: {
        userId,
        postId,
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
