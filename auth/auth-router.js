const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials"
  };
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    // since bcrypt hashes generate different results due to the salting,
    // we rely on the magic internals to compare hashes rather than doing it
    // manually with "!=="
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    const payload = {
      // this is public so we should be careful with what we put here
      userId: user.id,
      userRole: "normal"
    };
    // this is should not be public and of someone knows about it
    // they will be able to change it , so this is should secret
    const secret = process.env.TOKEN_SECRET;
    const token = jwt.sign(payload, secret);
    res.cookie("token", token);
    res.json({
      message: `Welcome ${user.username}!`
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
