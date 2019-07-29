// Run before the entire suite, to ensure DB is migrated
const spawnSync = require('child_process').spawnSync
module.exports = _ => spawnSync('npx', ['sequelize-cli db:migrate'])
