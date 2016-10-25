
exports.up = (knex, Promise) => {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('text').notNullable();
    table.integer('author_id')
                 .references('id')
                 .inTable('users');
    table.integer('revision').notNullable().defaultTo(1);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notes');
};
