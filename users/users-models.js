const db = require("../database/config");

module.exports = {
  find
};

async function find() {
  return await db("users");
}
