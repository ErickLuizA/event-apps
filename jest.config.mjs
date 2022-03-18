const defaultConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: '50%',
  transform: {},
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules']
}

export default {
  projects: [
    {
      ...defaultConfig,
      testEnvironment: 'node',
      displayName: 'backend',
      collectCoverageFrom: ['src/', '!src/index.js'],
      transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        'public'
      ],
      testMatch: ['**/src/**/*.spec.js', '**/test/**/*.spec.js']
    },
    {
      ...defaultConfig,
      testEnvironment: 'jsdom',
      displayName: 'frontend',
      collectCoverageFrom: ['public/'],
      transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        'src'
      ],
      testMatch: ['**/public/**/*.spec.js']
    }
  ]
}
