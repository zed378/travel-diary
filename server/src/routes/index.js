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
  getUserPost,
  editPost,
  delPost,
} = require("../controllers/post");

// import user controller
const { editUser, getUser } = require("../controllers/user");

// import bookmark controller
const { setMark, getMark, getAllMark } = require("../controllers/bookmark");

// import like controller
const { setLike, getLike, getAllLike } = require("../controllers/like");

// define auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// define post routes
router.post("/post", auth, postImg("thumbnail"), addPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/userpost/:id", getUserPost);
router.patch("/post/:id", auth, postImg("thumbnail"), editPost);
router.delete("/post/:id", auth, delPost);

// define user routes
router.get("/user/:id", getUser);
router.patch("/user/:id", auth, profileImg("photo"), editUser);

// define bookmark routes
router.get("/mark/:postId", auth, setMark);
router.get("/marks/:id", auth, getAllMark);
router.get("/getmark/:userId/:postId", auth, getMark);

// define like routes
router.get("/set-like/:userId/:postId", auth, setLike);
router.get("/like/:id", auth, getLike);
router.get("/get-like/:id", getAllLike);

module.exports = router;
