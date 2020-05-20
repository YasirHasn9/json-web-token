const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password should be alphanumeric"
    });
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    massage: "Invalid Credentials"
  };

  try {
    // 1 client send the credentials
    const user = await Users.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    } else {
      const validatePassword = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      // 2 the server verifies the data about the client
      if (!validatePassword) {
        return res.status(401).json(authError);
      }

      const tokenPayload = {
        // this is gonna be public , so we should be careful what we need to put here
        userId: user.id,
        userRole: "normal" // this is normally comes from the db
      };
      // 3 now we generate the token
      const token = jwt.sign(tokenPayload, 
        process.env.JWT_SECRET  /**to read this var from the .env we should enable
        it in the package.json under the server */
        );

      res.status(201).json({
        message: `Welcome ${user.username}`,
        token
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
