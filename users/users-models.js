const db = require("../database/config");

module.exports = {
  find,
  add,
  findById
};

async function find() {
  return await db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findById(id);
  } catch (err) {
    throw err;
  }
}

async function findById(id) {
  return await db("users")
    .where({ id })
    .first();
}
