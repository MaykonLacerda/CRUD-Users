module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: { ssl: { rejectUnauthorized: false } },
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations'
    }
  };