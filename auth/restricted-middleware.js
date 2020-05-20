const jwt = require("jsonwebtoken");
module.exports = () => {
  // add code here to verify users are logged in
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials"
    };
    try {
      // // now instead of setting the cookie manually
      // const token = req.headers.authorization;

      // we can use the cookie parser that helps with with parser the cookie
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authError);
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json(authError);
        }
        req.token = decodedPayload;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
};
