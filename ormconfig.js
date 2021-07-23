module.exports = {
    type: 'postgres',
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations'
    }
  };