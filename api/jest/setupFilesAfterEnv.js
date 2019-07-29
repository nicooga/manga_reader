const sequelize = require('@src/db').sequelize

const truncate = table => sequelize.query(`TRUNCATE TABLE "${table}" RESTART IDENTITY`)

// Run before each test to cleanup DB
global.beforeEach(done => (
  sequelize
    .query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
      AND tablename != 'SequelizeMeta'
    `)
    .then(([results]) => Promise.all(results.map(r => truncate(r.tablename))))
    .then(_ => done())
    .catch(_ => console.log('Error while truncanting tables'))
))
