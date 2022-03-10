const express = require("express");

const router = express.Router();
// import middleware
const { auth } = require("../middleware/auth");
const { profileImg, postImg } = require("../middleware/uploads");

// import auth controller
const { login, register, checkAuth } = require("../controllers/auth");

// import post controller
const {
  addPost,
  getPosts,
  getPost,
  editPost,
  delPost,
} = require("../controllers/post");

// import user controller
const { editUser } = require("../controllers/user");

// import bookmark controller
const { setMark, editMark } = require("../controllers/bookmark");

// define auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// define post routes
router.post("/post", auth, postImg("thumbnail"), addPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.patch("/post/:id", auth, postImg("thumbnail"), editPost);
router.delete("/post/:id", auth, delPost);

// define post routes
router.patch("/user/:id", auth, profileImg("photo"), editUser);

// define bookmark routes
router.post("/mark/:postId", auth, setMark);
router.patch("/mark/:postId/:val", auth, editMark);

module.exports = router;
