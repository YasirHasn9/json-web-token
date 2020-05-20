exports.up = async function(knex) {
  await knex.schema.createTable("roles", role => {
    role.increments("id");
    role
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("roles");
};
