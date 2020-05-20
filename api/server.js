const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("../users/users-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", users);

server.get("/", (req, res) => {
  res.json({ message: "Up" });
});

module.exports = server;
