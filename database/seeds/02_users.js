exports.seed = async function(knex) {
  await knex("users").insert([
    {
      username: "YasirHasn",
      password: "yasir"
    }
  ]);
};
