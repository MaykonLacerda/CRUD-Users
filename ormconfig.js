const exported = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['/src/database/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: './database/migrations'
  }
}

if(process.env.PROD === 'TRUE') {
  exported.migrations = ['./dist/database/migrations/*.js']
  exported.entities = ['./dist/modules/**/entities/*.js']
  exported.ssl = true
  exported.extra = { ssl: { rejectUnauthorized: false } }
}

module.exports = exported
