
export function seed (knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { title: 'backend' },
        { title: 'frontend' }
      ])
    })
}
