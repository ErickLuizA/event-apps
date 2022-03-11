export async function up (knex) {
  return knex.schema.createTable('episodes', table => {
    table.increments('id')
    table.text('title').notNullable()
    table.text('link').notNullable().unique()
    table.text('description')

    table.text('category').notNullable()
    table.foreign('category').references('categories.title').onDelete('CASCADE')

    table.timestamps(true, true)
  }).then()
}

export async function down (knex) { return knex.schema.dropTable('episodes') }
