const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["x-token"]||
    req.headers['authtoken'];
  // console.log(": ",token)
  // console.log("=> ",config.TOKEN_KEY)
  if (!token) {
    return res
      .status(403)
      .send({ result: false, data: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    console.log("Decoded: ", req.user);
  } catch (err) {
    return res.status(401).send({ result: false, data: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
