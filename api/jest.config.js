module.exports = {
  watchPlugins: ['jest-watch-master'],
  moduleNameMapper: {
    '^@root/(.*)\.js$': '<rootDir>/$1.js',
    '^@src/(.*)\.js$': '<rootDir>/src/$1.js'
  },
  globalSetup: './jest/globalSetup.js',
  setupFilesAfterEnv: ['./jest/setupFilesAfterEnv.js']
}
