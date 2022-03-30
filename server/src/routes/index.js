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
  editPostPic,
  updatePost,
  delPost,
} = require("../controllers/post");

// import user controller
const { editUserPic, getUser, updateProfile } = require("../controllers/user");

// import bookmark controller
const { setMark, getMark, getAllMark } = require("../controllers/bookmark");

// import like controller
const { setLike, getLike, getAllLike } = require("../controllers/like");

// import comment controller
const {
  addComment,
  getAllComment,
  setMenu,
  editsComment,
  delComment,
} = require("../controllers/comment");

// define auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// define post routes
router.post("/post", auth, postImg("thumbnail"), addPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPost);
router.get("/userpost/:id", getUserPost);
router.patch("/post/:id", auth, postImg("thumbnail"), editPostPic);
router.patch("/post-edit/:id", auth, updatePost);
router.delete("/post/:id", auth, delPost);

// define user routes
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, profileImg("photo"), editUserPic);
router.patch("/user-edit/:id", auth, updateProfile);

// define bookmark routes
router.get("/mark/:postId", auth, setMark);
router.get("/marks/:id", auth, getAllMark);
router.get("/getmark/:userId/:postId", auth, getMark);

// define like routes
router.get("/set-like/:userId/:postId", auth, setLike);
router.get("/like/:id", auth, getLike);
router.get("/get-like/:id", getAllLike);

// define comment routes
router.post("/comment/:userId/:postId", auth, addComment);
router.get("/comments/:postId", getAllComment);
router.get("/comment-menu/:id", setMenu);
router.patch("/comments/:id/:content", auth, editsComment);
router.delete("/comment/:id", auth, delComment);

module.exports = router;
