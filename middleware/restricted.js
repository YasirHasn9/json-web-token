const jwt = require("jsonwebtoken");
module.exports = {
  restricted
};
// first we declare  a function
function restricted(role) {
  // this is function return a function
  return async (req, res, next) => {
    try {
      // make an error message
      const authError = {
        message: "Invalid Credentials"
      };
      // we need the jsonwebtoken to enable us to validate the token
      // so lets get the token and send it back to the client as header
      // on the req object

      // this is gonna be manually , which is bad
      // const token =  req.header.authorization

      // instead of doing the token on the header , we can send on the res
      const token = req.cookies.token;
      // make sure is the token is valid be checking it up
      if (!token) {
        res.status(401).json(authError);
      }
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedPayload) => {
        req.token = decodedPayload;
        if (err) {
          return res.status(401).json(authError);
        }
        if (!(decodedPayload.userRole = role && role === "admin")) {
          return res.status(401).json(authError);
        }
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}
