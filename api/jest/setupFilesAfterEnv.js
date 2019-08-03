import { sequelize } from '@src/db'

const truncate = table => sequelize.query(`TRUNCATE "${table}" RESTART IDENTITY CASCADE`)

const truncateAll = async _ => {
  try {
    const [results] =
      await sequelize.query(`
        SELECT * FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        AND tablename != 'SequelizeMeta'
      `)

    return await Promise.all(results.map(r => truncate(r.tablename)))
  } catch(error) {
    console.log('Error while truncanting tables', error)
    return Promise.reject(error)
  }
}

global.beforeEach(async done => {
  try { await truncateAll() } finally { done() }
})

global.afterAll(async done => {
  try { await sequelize.close() } finally { done() }
})
