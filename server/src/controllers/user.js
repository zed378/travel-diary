// import model
const { user } = require("../../models");

// import package
const fs = require("fs");
const path = require("path");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    let find = await user.findOne({
      where: { id },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    find.photo = process.env.PHOTO_PATH + find.photo;

    res.send({
      status: "Success",
      data: find,
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      name: req.body.name,
      photo: req.file.filename,
      phone: req.body.phone,
    };

    let checkUser = await user.findOne({
      where: { id },
    });

    if (!checkUser) {
      return res.send({
        message: "Failed to delete",
      });
    } else {
      delImg(checkUser.photo);

      await user.update(data, {
        where: { id },
      });
    }

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

const delImg = (filePath) => {
  if (filePath !== "profile.svg") {
    filePath = path.join(__dirname, "../../uploads/profile/", filePath);

    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  }
};
