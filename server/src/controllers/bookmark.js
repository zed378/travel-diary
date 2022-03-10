// import model
const { bookmark } = require("../../models");

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
