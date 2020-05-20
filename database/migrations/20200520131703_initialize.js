exports.up = async function(knex) {
  await knex.schema.createTable("roles", role => {
    role.increments("id");
    role
      .string("name", 128)
      .notNullable()
      .unique();
  });
  await knex.schema.createTable("users", user => {
    user.increments("id");
    user
      .string("username", 128)
      .notNullable()
      .unique()
      .index();

    user.string("password", 225).notNullable();

    user
      .integer("role")
      .unsigned()
      .references("roles.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("roles");
};
