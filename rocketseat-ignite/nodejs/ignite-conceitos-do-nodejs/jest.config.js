module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  testMatch: [
    '<rootDir>/src/__tests__/*.spec.js'
  ]
}
