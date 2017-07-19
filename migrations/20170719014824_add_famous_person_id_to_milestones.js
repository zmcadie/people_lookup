
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.integer('famous_person_id')
      .references('id')
      .inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
      table.dropColumn('famous_person_id')
    })
  ])
};
