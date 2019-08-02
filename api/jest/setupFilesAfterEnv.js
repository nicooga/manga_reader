import { sequelize } from '@src/db'

const truncate = table => sequelize.query(`DELETE FROM "${table}"`)

const truncateAll = _ => (
  sequelize
    .query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
      AND tablename != 'SequelizeMeta'
    `)
    .then(([results]) => Promise.all(results.map(r => truncate(r.tablename))))
    .catch((...args) => {
      console.log('Error while truncanting tables', args)
      return Promise.reject(...args)
    })
)

global.beforeEach(done => truncateAll().then(_ => done()).catch(done))
global.afterAll(() => sequelize.close())
