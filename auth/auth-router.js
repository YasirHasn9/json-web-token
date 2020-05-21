const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-models");

router.post("/register", async (req, res, next) => {
  const authError = {
    message: "Invalid user"
  };
  try {
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;
    const user = await Users.add(credentials);
    if (!user) {
      return res.status(401).json(authError);
    }
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
