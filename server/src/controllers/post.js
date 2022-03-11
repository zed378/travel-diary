// import model
const { user, post, bookmark } = require("../../models");

// import package
const fs = require("fs");
const path = require("path");

exports.addPost = async (req, res) => {
  try {
    const input = {
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.file.filename,
    };

    const data = await post.create(input);

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

exports.getPosts = async (req, res) => {
  try {
    let data = await post.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "email",
              "password",
              "photo",
              "phone",
              "createdAt",
              "updatedAt",
            ],
          },
        },

        {
          model: bookmark,
          as: "mark",
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        thumbnail: process.env.POST_PATH + item.thumbnail,
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

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await post.findOne({
      where: { id },
      include: {
        model: bookmark,
        as: "mark",
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },

      attributes: {
        exclude: ["updatedAt"],
      },
    });

    data.thumbnail = process.env.POST_PATH + data.thumbnail;

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

exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.file.filename,
    };

    let checkPost = await post.findOne({
      where: { id },
    });

    if (!checkPost) {
      return res.send({
        message: "Failed to delete",
      });
    } else {
      delImg(checkPost.thumbnail);

      await post.update(data, {
        where: { id },
      });
    }

    data.thumbnail = process.env.POST_PATH + data.thumbnail;

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

exports.delPost = async (req, res) => {
  try {
    const { id } = req.params;

    let checkPost = await post.findOne({
      where: { id },
    });

    if (!checkPost) {
      return res.send({
        message: "Failed to delete",
      });
    } else {
      delImg(checkPost.thumbnail);

      await post.destroy({
        where: { id },
      });
    }

    res.send({
      status: "Success",
      message: "Success delete post",
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

const delImg = (filePath) => {
  filePath = path.join(__dirname, "../../uploads/post/", filePath);

  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
};
