const jwt = require("jsonwebtoken");
module.exports = {
  restricted
};

function restricted() {
  return (req, res, next) => {
    const authError = {
      message: "Invalid Credentials"
    };
    try {
      // to validate the token , first we need to get it somehow
      // when the client makes a subsequent request , they would
      // send a headers object that we can assign authorization the object on the
      // req object
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json(authError);
        } else {
          // in some middle wars we want to get access
          // to the some of the info on the user
          req.toke = decodedPayload;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  };
}
