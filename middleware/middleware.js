const jwt = require("jsonwebtoken");
module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access" });
  if (token) {
    jwt.verify(token, process.env.JWT_SECRECT, (err, decode) => {
      if (err) return res.status(401).send({ message: "unauthorized access" });
      req.user = decode;
      return next();
    });
  }
};
