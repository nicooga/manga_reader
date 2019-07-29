import { truncateAll } from '@jest/helpers'
  
global.beforeEach(done => truncateAll().then(_ => done()))
