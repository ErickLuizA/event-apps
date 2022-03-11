export async function up (knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id')
    table.text('title').notNullable().unique()

    table.timestamps(true, true)
  })
}

export async function down (knex) { return knex.schema.dropTable('categories') }
