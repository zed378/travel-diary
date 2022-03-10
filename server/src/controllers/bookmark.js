// import model
const { bookmark } = require("../../models");

exports.setMark = async (req, res) => {
  try {
    const { postId } = req.params;

    await bookmark.create({
      userId: req.user.id,
      postId: postId,
      isMark: 1,
    });

    res.send({
      status: "Success",
      message: "Success bookmarked diary",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.editMark = async (req, res) => {
  try {
    const { postId, val } = req.params;

    await bookmark.update(
      {
        isMark: val,
      },
      { where: { postId } }
    );

    res.send({
      status: "Success",
      message: "Success update mark diary",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
