// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/turism.db3'
    },
    migrations: {
      directory:'./api/migrations'
    },
    useNullAsDefault:true,
  },
};
