// import module
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  // catch auth header from jwt
  const authHeader = req.header("Authorization");

  // split to get header value on index #1 and ignore "Bearer" string
  const token = authHeader && authHeader.split(" ")[1];

  // validate if token did not match
  if (!token) {
    return res.status(400).send({
      message: "Access Denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
