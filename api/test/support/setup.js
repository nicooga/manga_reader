import chai from 'chai'
import sinonChai from 'sinon-chai'
import { spawnSync } from 'child_process'

import { truncateAll } from '@test_support/helpers'
import { sequelize } from '@src/db'

chai.use(sinonChai)

before(() => spawnSync('npx', ['sequelize-cli db:migrate']))
beforeEach(() => truncateAll())
after(() => sequelize.close())
