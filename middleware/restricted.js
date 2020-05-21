const jwt = require("jsonwebtoken");
module.exports = {
  restricted
};

// function restricted() {
//   return (req, res, next) => {
//     const authError = {
//       message: "Invalid Credentials"
//     };
//     try {
//       // to validate the token , first we need to get it somehow
//       // when the client makes a subsequent request , they would
//       // send a headers object that we can assign authorization the object on the
//       // req object
//       const token = req.headers.authorization;
//       if (!token) {
//         return res.status(401).json(authError);
//       }

//       jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedPayload) => {
//         if (err) {
//           return res.status(401).json(authError);
//         } else {
//           // in some middle wars we want to get access
//           // to the some of the info on the user
//           req.toke = decodedPayload;
//           next();
//         }
//       });
//     } catch (err) {
//       next(err);
//     }
//   };
// }

// first we declare  a function
function restricted() {
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
        if (err) {
          return res.status(401).json(authError);
        }
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}
